<template>
  <section class="ky-picker" :class="{ 'is-disabled': disabled }" :aria-label="ariaLabel">
    <header v-if="showToolbar" class="ky-picker__toolbar">
      <button type="button" :disabled="disabled" @click="emit('cancel')">{{ cancelText }}</button>
      <strong>{{ title }}</strong>
      <button type="button" :disabled="disabled || !canConfirm" @click="confirm">
        {{ confirmText }}
      </button>
    </header>

    <div class="ky-picker__columns" :style="pickerStyle">
      <div class="ky-picker__mask ky-picker__mask--top" aria-hidden="true" />
      <div class="ky-picker__mask ky-picker__mask--bottom" aria-hidden="true" />
      <div class="ky-picker__selection" aria-hidden="true" />

      <div
        v-for="(column, columnIndex) in normalizedColumns"
        :key="columnIndex"
        class="ky-picker__column"
        role="listbox"
        :aria-label="`第 ${columnIndex + 1} 列`"
        data-no-touch-scroll
        @pointerdown="startPointerDrag($event, columnIndex)"
        @touchstart.passive="startSyntheticTouchDrag($event, columnIndex)"
        @wheel.prevent="handleWheel($event, columnIndex)"
      >
        <div
          class="ky-picker__list"
          :class="{ 'is-dragging': dragColumn === columnIndex }"
          :style="columnStyle(columnIndex)"
        >
          <button
            v-for="(option, optionIndex) in column"
            :key="optionKey(option, optionIndex)"
            type="button"
            role="option"
            :aria-selected="indexes[columnIndex] === optionIndex"
            :tabindex="indexes[columnIndex] === optionIndex ? 0 : -1"
            :disabled="disabled"
            :class="{ 'is-selected': indexes[columnIndex] === optionIndex }"
            @click="setColumnIndex(columnIndex, optionIndex)"
            @keydown.up.prevent="setColumnIndex(columnIndex, optionIndex - 1)"
            @keydown.down.prevent="setColumnIndex(columnIndex, optionIndex + 1)"
          >
            <slot name="option" :option="option" :index="optionIndex" :column-index="columnIndex">
              {{ optionText(option) }}
            </slot>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import type { PickerChangePayload, PickerColumn, PickerOption, PickerProps } from './picker';
import { clampPickerIndex } from './picker';

defineOptions({ name: 'KyPicker' });
const props = withDefaults(defineProps<PickerProps>(), {
  modelValue: () => [],
  title: '',
  defaultIndex: 0,
  columnsFieldNames: () => ({}),
  itemHeight: 44,
  visibleItemCount: 5,
  swipeDuration: 300,
  confirmText: '确认',
  cancelText: '取消',
  showToolbar: true,
  disabled: false,
  ariaLabel: '滚动选择器',
});
const emit = defineEmits<{
  'update:modelValue': [values: PickerOption[]];
  change: [payload: PickerChangePayload];
  confirm: [payload: Omit<PickerChangePayload, 'columnIndex'>];
  cancel: [];
}>();

const indexes = ref<number[]>([]);
const dragOffsets = ref<number[]>([]);
const dragColumn = ref(-1);
let stopDragListeners: (() => void) | undefined;
let dragSessionId = 0;

const normalizedColumns = computed<PickerColumn[]>(() => {
  const columns = props.columns;
  if (!columns.length) return [];
  return Array.isArray(columns[0]) ? (columns as PickerColumn[]) : [columns as PickerColumn];
});
// 无列或存在空列时无法得到完整选中值，禁止确认以避免发出 undefined 载荷。
const canConfirm = computed(
  () =>
    normalizedColumns.value.length > 0 &&
    normalizedColumns.value.every((column) => column.length > 0),
);
const centerOffset = computed(() => Math.floor(props.visibleItemCount / 2) * props.itemHeight);
const pickerStyle = computed(() => ({
  height: `${props.visibleItemCount * props.itemHeight}px`,
  '--ky-picker-item-height': `${props.itemHeight}px`,
  '--ky-picker-center-offset': `${centerOffset.value}px`,
  '--ky-picker-duration': `${props.swipeDuration}ms`,
}));

function optionText(option: PickerOption) {
  if (typeof option !== 'object') return String(option);
  const textKey = props.columnsFieldNames.text ?? 'text';
  return String(option[textKey] ?? option.label ?? option.value ?? '');
}

function optionValue(option: PickerOption) {
  if (typeof option !== 'object') return option;
  const valueKey = props.columnsFieldNames.value ?? 'value';
  return option[valueKey] ?? option;
}

function optionKey(option: PickerOption, index: number) {
  const value = optionValue(option);
  return typeof value === 'object' ? index : String(value);
}

function valuesFromIndexes(): PickerOption[] {
  // 无列或空列无法得到完整选中值，返回空数组保持载荷与公开类型一致。
  if (!canConfirm.value) return [];
  return normalizedColumns.value
    .map((column, index) => column[indexes.value[index] ?? 0])
    .filter((option): option is PickerOption => option !== undefined);
}

function emitChange(columnIndex: number) {
  const payload = { values: valuesFromIndexes(), indexes: [...indexes.value], columnIndex };
  emit('update:modelValue', payload.values);
  emit('change', payload);
}

function setColumnIndex(columnIndex: number, nextIndex: number, shouldEmit = true) {
  if (props.disabled) return;
  const column = normalizedColumns.value[columnIndex] ?? [];
  // 空列没有可选值，跳过索引更新与事件，避免拖拽或滚轮操作发出 undefined 选项。
  if (!column.length) return;
  indexes.value[columnIndex] = clampPickerIndex(nextIndex, column.length);
  dragOffsets.value[columnIndex] = 0;
  indexes.value = [...indexes.value];
  dragOffsets.value = [...dragOffsets.value];
  if (shouldEmit) emitChange(columnIndex);
}

function columnStyle(columnIndex: number) {
  const index = indexes.value[columnIndex] ?? 0;
  const offset = dragOffsets.value[columnIndex] ?? 0;
  return {
    transform: `translate3d(0, ${centerOffset.value - index * props.itemHeight + offset}px, 0)`,
    transitionDuration: dragColumn.value === columnIndex ? '0ms' : `${props.swipeDuration}ms`,
  };
}

function stopActiveDrag() {
  stopDragListeners?.();
  stopDragListeners = undefined;
}

function createDragSession(startY: number, columnIndex: number) {
  stopActiveDrag();
  const sessionId = ++dragSessionId;
  const startOffset = dragOffsets.value[columnIndex] ?? 0;
  dragColumn.value = columnIndex;

  function move(clientY: number, preventDefault: () => void) {
    if (sessionId !== dragSessionId) return;
    preventDefault();
    dragOffsets.value[columnIndex] = startOffset + clientY - startY;
    dragOffsets.value = [...dragOffsets.value];
  }

  function finish(cancelled = false) {
    if (sessionId !== dragSessionId) return;
    const movedItems = -(dragOffsets.value[columnIndex] ?? 0) / props.itemHeight;
    const nextIndex = (indexes.value[columnIndex] ?? 0) + movedItems;
    stopActiveDrag();
    dragColumn.value = -1;

    if (cancelled) {
      dragOffsets.value[columnIndex] = 0;
      dragOffsets.value = [...dragOffsets.value];
      return;
    }
    setColumnIndex(columnIndex, nextIndex);
  }

  return { move, finish };
}

// PointerEvent 处理真实设备与现代浏览器，并把监听放到 window 防止快速拖动丢失结束事件。
function startPointerDrag(event: PointerEvent, columnIndex: number) {
  if (props.disabled) return;
  const target = event.currentTarget as HTMLElement;
  const pointerId = event.pointerId;
  const session = createDragSession(event.clientY, columnIndex);
  target.setPointerCapture?.(pointerId);

  function move(moveEvent: PointerEvent) {
    if (moveEvent.pointerId !== pointerId) return;
    session.move(moveEvent.clientY, () => moveEvent.preventDefault());
  }

  function end(endEvent: PointerEvent) {
    if (endEvent.pointerId !== pointerId) return;
    target.releasePointerCapture?.(pointerId);
    session.finish();
  }

  function cancel(cancelEvent: PointerEvent) {
    if (cancelEvent.pointerId !== pointerId) return;
    target.releasePointerCapture?.(pointerId);
    session.finish(true);
  }

  window.addEventListener('pointermove', move);
  window.addEventListener('pointerup', end);
  window.addEventListener('pointercancel', cancel);
  stopDragListeners = () => {
    window.removeEventListener('pointermove', move);
    window.removeEventListener('pointerup', end);
    window.removeEventListener('pointercancel', cancel);
  };
}

// 桌面触摸模拟器使用非可信 TouchEvent，兼容鼠标操作且避免真实触摸重复触发。
function startSyntheticTouchDrag(event: TouchEvent, columnIndex: number) {
  if (event.isTrusted || props.disabled || event.touches.length !== 1) return;
  const touch = event.touches.item(0);
  if (!touch) return;
  const identifier = touch.identifier;
  const session = createDragSession(touch.clientY, columnIndex);

  function move(moveEvent: TouchEvent) {
    if (moveEvent.isTrusted) return;
    const currentTouch = Array.from(moveEvent.touches).find(
      (item) => item.identifier === identifier,
    );
    if (!currentTouch) return;
    session.move(currentTouch.clientY, () => moveEvent.preventDefault());
  }

  function end(endEvent: TouchEvent) {
    if (endEvent.isTrusted) return;
    const changedTouch = Array.from(endEvent.changedTouches).find(
      (item) => item.identifier === identifier,
    );
    if (changedTouch) session.finish();
  }

  function cancel(cancelEvent: TouchEvent) {
    if (!cancelEvent.isTrusted) session.finish(true);
  }

  window.addEventListener('touchmove', move, { passive: false });
  window.addEventListener('touchend', end);
  window.addEventListener('touchcancel', cancel);
  stopDragListeners = () => {
    window.removeEventListener('touchmove', move);
    window.removeEventListener('touchend', end);
    window.removeEventListener('touchcancel', cancel);
  };
}

function handleWheel(event: WheelEvent, columnIndex: number) {
  const direction = event.deltaY > 0 ? 1 : -1;
  setColumnIndex(columnIndex, (indexes.value[columnIndex] ?? 0) + direction);
}

function confirm() {
  if (!canConfirm.value) return;
  emit('confirm', { values: valuesFromIndexes(), indexes: [...indexes.value] });
}

function initialize() {
  const defaults = Array.isArray(props.defaultIndex) ? props.defaultIndex : [props.defaultIndex];
  indexes.value = normalizedColumns.value.map((column, columnIndex) => {
    const currentValue = props.modelValue[columnIndex];
    const modelIndex = column.findIndex(
      (option) => optionValue(option) === optionValue(currentValue),
    );
    return clampPickerIndex(
      modelIndex >= 0 ? modelIndex : (defaults[columnIndex] ?? defaults[0] ?? 0),
      column.length,
    );
  });
  dragOffsets.value = normalizedColumns.value.map(() => 0);
}

onBeforeUnmount(stopActiveDrag);

// 拆分列数据与选中值的深度监听，避免任意一项变化时同时遍历整棵列数据和选中值。
watch(
  () => props.columns,
  () => initialize(),
  { deep: true, immediate: true },
);
watch(
  () => props.modelValue,
  () => initialize(),
  { deep: true },
);
watch(
  () => props.defaultIndex,
  () => initialize(),
);

defineExpose({
  getIndexes: () => [...indexes.value],
  getValues: valuesFromIndexes,
  setColumnIndex,
});
</script>
