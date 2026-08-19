<template>
  <KyPopup
    :model-value="isVisible"
    position="bottom"
    round
    :overlay="resolvedOverlay"
    :close-on-overlay="resolvedCloseOnOverlay"
    :safe-area="safeArea"
    :z-index="resolvedZIndex"
    :animation="animation"
    :duration="effectiveDuration"
    :panel-class="popupPanelClass"
    aria-label="操作面板"
    @update:model-value="setVisible"
    @opened="emit('show')"
    @closed="handlePopupClosed"
  >
    <section
      class="ky-action-sheet"
      :class="{ 'is-dragging': dragOffset > 0, 'has-custom-header': $slots.header }"
      :style="sheetStyle"
    >
      <div
        v-if="closeOnSwipe"
        class="ky-action-sheet__drag-area"
        data-no-touch-scroll
        aria-hidden="true"
        @pointerdown="dragGesture.startPointer"
        @touchstart.passive="dragGesture.startTouch"
      >
        <span class="ky-action-sheet__handle" />
      </div>
      <header
        v-if="title || resolvedShowClose || $slots.header"
        class="ky-action-sheet__header"
        :class="{ 'has-custom-content': $slots.header }"
      >
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
          <KyIcon source="iconfont" name="close" :size="20" />
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
import { computed, ref, watch } from 'vue';
import { getGlobalZIndex } from '../shared/global-z-index';
import { shouldCommitGesture, useAxisDrag, useReducedMotion } from '../shared/use-gesture';
import KyButton from '../button';
import KyIcon from '../icon';
import KyPopup from '../popup';
import type { ActionSheetAction, ActionSheetProps, ActionSheetTab } from './action-sheet';

defineOptions({ name: 'KyActionSheet' });
const props = withDefaults(defineProps<ActionSheetProps>(), {
  actions: () => [],
  showClose: true,
  closeOnOverlay: true,
  closeOnSwipe: true,
  overlay: true,
  zIndex: undefined,
  maxHeight: '86vh',
  heightFixedValue: 86,
  contentStyle: () => ({}),
  tabs: () => [],
  activeTab: 0,
  safeArea: true,
});
const resolvedZIndex = computed(() => props.zIndex ?? getGlobalZIndex(1000));
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
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
const isVisible = computed(() => Boolean(props.modelValue));
const reducedMotion = useReducedMotion();
const effectiveDuration = computed(() => (reducedMotion.value ? 0 : props.duration));
const resolvedShowClose = computed(() => props.showClose);
const resolvedOverlay = computed(() => props.overlay);
const resolvedCloseOnOverlay = computed(() => props.closeOnOverlay);
const resolvedTabs = computed<ActionSheetTab[]>(() =>
  props.tabs.map((item) => (typeof item === 'object' ? item : { title: item })),
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
// 透传到 Popup 面板，标记由 ActionSheet 承载：关闭面板自身的滚动与背景，
// 避免内部 overscroll 触发外层 Popup 出现滚动条，也避免面板背景/阴影覆盖 ActionSheet 圆角。
const popupPanelClass = 'ky-action-sheet__popup-panel';

watch(
  () => props.activeTab,
  (value) => {
    currentTab.value = value;
  },
);

function setVisible(value: boolean) {
  emit('update:modelValue', value);
}

function handlePopupClosed() {
  dragOffset.value = 0;
  emit('hide');
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

const dragGesture = useAxisDrag({
  axis: 'y',
  disabled: computed(() => !props.closeOnSwipe || !isVisible.value),
  onMove: ({ offset }) => {
    dragOffset.value = Math.max(0, offset);
  },
  onEnd: ({ rawOffset, velocity }) => {
    const projectedOffset = rawOffset + velocity * 120;
    if (projectedOffset > 0 && shouldCommitGesture(rawOffset, velocity, 72, 0.45)) {
      // 关闭时保留 dragOffset，让 Popup 退场动画从当前位置接管，避免先回弹再退场造成抖动。
      close();
      return;
    }
    dragOffset.value = 0;
  },
  onCancel: () => {
    dragOffset.value = 0;
  },
});
</script>
