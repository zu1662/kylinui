<template>
  <KyPopup
    :model-value="isVisible"
    position="bottom"
    round
    :overlay="resolvedOverlay"
    :close-on-overlay="resolvedCloseOnOverlay"
    :safe-area="safeArea"
    :z-index="zIndex"
    :animation="animation"
    :duration="duration"
    aria-label="操作面板"
    @update:model-value="setVisible"
    @opened="emit('show')"
    @closed="emit('hide')"
  >
    <section class="ky-action-sheet" :class="{ 'is-dragging': dragOffset > 0 }" :style="sheetStyle">
      <div
        v-if="closeOnSwipe"
        class="ky-action-sheet__drag-area"
        data-no-touch-scroll
        aria-hidden="true"
        @pointerdown="startPointerDrag"
        @touchstart.passive="startSyntheticTouchDrag"
      >
        <span class="ky-action-sheet__handle" />
      </div>
      <header v-if="title || resolvedShowClose || $slots.header" class="ky-action-sheet__header">
        <slot name="header">
          <div class="ky-action-sheet__title-wrap">
            <h2>{{ title }}</h2>
          </div>
        </slot>
        <button
          v-if="resolvedShowClose"
          class="ky-action-sheet__close"
          type="button"
          aria-label="关闭操作面板"
          @click="close"
        >
          <KyIconX name="close" :size="20" />
        </button>
      </header>

      <nav v-if="resolvedTabs.length" class="ky-action-sheet__tabs" aria-label="操作面板选项卡">
        <button
          v-for="(tab, index) in resolvedTabs"
          :key="`${tab.title}-${index}`"
          type="button"
          :class="{ 'is-active': currentTab === index }"
          @click="selectTab(index)"
        >
          <span>{{ tab.title }}</span>
          <small v-if="tab.subTitle">{{ tab.subTitle }}</small>
        </button>
      </nav>

      <div class="ky-action-sheet__body" :style="contentStyle">
        <slot :active-tab="currentTab">
          <button
            v-for="(action, index) in actions"
            :key="`${action.value ?? action.name}-${index}`"
            class="ky-action-sheet__action"
            :class="{ 'is-danger': action.danger, 'is-loading': action.loading }"
            type="button"
            :disabled="action.disabled || action.loading"
            :style="action.color ? { color: action.color } : undefined"
            @click="selectAction(action, index)"
          >
            <span>{{ action.loading ? '加载中' : action.name }}</span>
            <small v-if="action.description">{{ action.description }}</small>
          </button>
        </slot>
      </div>

      <footer v-if="confirmText || cancelText || $slots.footer" class="ky-action-sheet__footer">
        <slot name="footer">
          <KyButton v-if="cancelText" variant="secondary" block @click="cancel">
            {{ cancelText }}
          </KyButton>
          <KyButton v-if="confirmText" block @click="confirm">{{ confirmText }}</KyButton>
        </slot>
      </footer>
    </section>
  </KyPopup>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import KyButton from '../button';
import KyIconX from '../iconx';
import KyPopup from '../popup';
import type { ActionSheetAction, ActionSheetProps, ActionSheetTab } from './action-sheet';

defineOptions({ name: 'KyActionSheet' });
const props = withDefaults(defineProps<ActionSheetProps>(), {
  actions: () => [],
  showClose: true,
  closeIcon: true,
  closeOnOverlay: true,
  maskClosable: true,
  closeOnSwipe: true,
  overlay: true,
  hasMask: true,
  zIndex: 1000,
  maxHeight: '86vh',
  heightFixedValue: 86,
  contentStyle: () => ({}),
  tabs: () => [],
  tabArea: () => [],
  activeTab: 0,
  safeArea: true,
});
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'update:visible': [value: boolean];
  'update:activeTab': [value: number];
  select: [action: ActionSheetAction, index: number];
  tabChange: [index: number];
  confirm: [];
  cancel: [];
  show: [];
  hide: [];
}>();

const dragOffset = ref(0);
const currentTab = ref(props.activeTab);
const isVisible = computed(() => Boolean(props.modelValue || props.visible));
const resolvedShowClose = computed(() => props.showClose && props.closeIcon);
const resolvedOverlay = computed(() => props.overlay && props.hasMask);
const resolvedCloseOnOverlay = computed(() => props.closeOnOverlay && props.maskClosable);
const resolvedTabs = computed<ActionSheetTab[]>(() =>
  (props.tabs.length ? props.tabs : props.tabArea).map((item) =>
    typeof item === 'object' ? item : { title: item },
  ),
);
const resolvedHeight = computed(() => {
  if (props.height) return props.height;
  return props.heightFixed ? `${props.heightFixedValue}vh` : undefined;
});
const sheetStyle = computed(() => ({
  maxHeight: props.maxHeight,
  height: resolvedHeight.value,
  transform: dragOffset.value ? `translateY(${dragOffset.value}px)` : undefined,
}));

watch(
  () => props.activeTab,
  (value) => {
    currentTab.value = value;
  },
);
watch(isVisible, (value) => {
  if (!value) dragOffset.value = 0;
});

function setVisible(value: boolean) {
  emit('update:modelValue', value);
  emit('update:visible', value);
}

function close() {
  setVisible(false);
}

function cancel() {
  emit('cancel');
  close();
}

function confirm() {
  emit('confirm');
}

function selectAction(action: ActionSheetAction, index: number) {
  if (action.disabled || action.loading) return;
  emit('select', action, index);
  close();
}

function selectTab(index: number) {
  currentTab.value = index;
  emit('update:activeTab', index);
  emit('tabChange', index);
}

let stopDragListeners: (() => void) | undefined;
let dragSessionId = 0;

function stopActiveDrag() {
  stopDragListeners?.();
  stopDragListeners = undefined;
}

function updateDragOffset(clientY: number, startY: number) {
  dragOffset.value = Math.max(0, clientY - startY);
}

function finishDrag(sessionId: number, cancelled = false) {
  if (sessionId !== dragSessionId) return;
  const shouldClose = !cancelled && dragOffset.value > 72;
  stopActiveDrag();
  dragOffset.value = 0;
  if (shouldClose) close();
}

// PointerEvent 负责真实触屏和普通浏览器；监听 window 可避免指针移出拖拽条后丢失结束事件。
function startPointerDrag(event: PointerEvent) {
  if (!props.closeOnSwipe) return;
  stopActiveDrag();
  const sessionId = ++dragSessionId;
  const startY = event.clientY;
  const pointerId = event.pointerId;
  const target = event.currentTarget as HTMLElement;
  target.setPointerCapture?.(pointerId);

  function move(moveEvent: PointerEvent) {
    if (moveEvent.pointerId !== pointerId || sessionId !== dragSessionId) return;
    moveEvent.preventDefault();
    updateDragOffset(moveEvent.clientY, startY);
  }

  function end(endEvent: PointerEvent) {
    if (endEvent.pointerId !== pointerId) return;
    target.releasePointerCapture?.(pointerId);
    finishDrag(sessionId);
  }

  function cancel(cancelEvent: PointerEvent) {
    if (cancelEvent.pointerId !== pointerId) return;
    target.releasePointerCapture?.(pointerId);
    finishDrag(sessionId, true);
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

// 文档站的触摸模拟器会派发非可信 TouchEvent，单独兼容它且不重复处理真实手机手势。
function startSyntheticTouchDrag(event: TouchEvent) {
  if (event.isTrusted || !props.closeOnSwipe || event.touches.length !== 1) return;
  const touch = event.touches.item(0);
  if (!touch) return;

  stopActiveDrag();
  const sessionId = ++dragSessionId;
  const startY = touch.clientY;
  const identifier = touch.identifier;

  function move(moveEvent: TouchEvent) {
    if (moveEvent.isTrusted || sessionId !== dragSessionId) return;
    const currentTouch = Array.from(moveEvent.touches).find(
      (item) => item.identifier === identifier,
    );
    if (!currentTouch) return;
    moveEvent.preventDefault();
    updateDragOffset(currentTouch.clientY, startY);
  }

  function end(endEvent: TouchEvent) {
    if (endEvent.isTrusted) return;
    const changedTouch = Array.from(endEvent.changedTouches).find(
      (item) => item.identifier === identifier,
    );
    if (changedTouch) finishDrag(sessionId);
  }

  function cancel(cancelEvent: TouchEvent) {
    if (!cancelEvent.isTrusted) finishDrag(sessionId, true);
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

onBeforeUnmount(stopActiveDrag);
</script>
