<template>
  <Teleport :to="teleportTarget" :disabled="teleport === false">
    <Transition name="ky-popup-fade" :duration="transitionDuration" @after-leave="handleAfterLeave">
      <div
        v-if="rendered || !destroyOnClose"
        v-show="overlayVisible"
        class="ky-popup"
        :class="[`ky-popup--${position}`, { 'ky-popup--without-overlay': !overlay }]"
        :style="popupStyle"
        @click.self="handleOverlayClick"
      >
        <Transition
          :name="transitionName"
          :css="panelAnimationEnabled"
          :duration="transitionDuration"
          @after-enter="handleAfterEnter"
        >
          <section
            v-show="panelVisible"
            ref="panel"
            class="ky-popup__panel"
            :class="[
              panelClass,
              {
                'is-round': round,
                'is-safe-area': safeArea,
              },
            ]"
            :role="role"
            aria-modal="true"
            :aria-label="ariaLabel || undefined"
            :aria-labelledby="ariaLabelledby"
            :aria-describedby="ariaDescribedby"
            @click.stop
          >
            <slot />
          </section>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { useLockScroll } from '../shared/use-lock-scroll';
import type { PopupAnimation, PopupDuration, PopupProps } from './popup';

defineOptions({ name: 'KyPopup' });
const props = withDefaults(defineProps<PopupProps>(), {
  position: 'center',
  overlay: true,
  closeOnOverlay: true,
  lockScroll: true,
  round: false,
  safeArea: true,
  destroyOnClose: true,
  teleport: 'body',
  zIndex: 900,
  duration: () => ({ enter: 300, leave: 275 }),
  panelClass: undefined,
  role: 'dialog',
  ariaLabel: '弹出层',
  ariaLabelledby: undefined,
  ariaDescribedby: undefined,
});
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  open: [];
  opened: [];
  close: [];
  closed: [];
  clickOverlay: [];
}>();

const DEFAULT_DURATION: Required<PopupDuration> = { enter: 300, leave: 275 };
const BUILT_IN_ANIMATIONS = new Set<PopupAnimation>([
  'zoom',
  'punch',
  'slide-up',
  'slide-down',
  'slide-left',
  'slide-right',
  'fade',
  'fade-up',
  'fade-down',
  'fade-left',
  'fade-right',
  'post-up',
  'none',
]);
const POSITION_ANIMATION: Record<NonNullable<PopupProps['position']>, PopupAnimation> = {
  center: 'zoom',
  bottom: 'slide-up',
  top: 'slide-down',
  left: 'slide-right',
  right: 'slide-left',
};

const isVisible = computed(() => Boolean(props.modelValue));
const teleportTarget = computed(() => (props.teleport === false ? 'body' : props.teleport));
const transitionDuration = computed<Required<PopupDuration>>(() => {
  if (typeof props.duration === 'number') {
    return { enter: props.duration, leave: props.duration };
  }
  return {
    enter: props.duration?.enter ?? DEFAULT_DURATION.enter,
    leave: props.duration?.leave ?? DEFAULT_DURATION.leave,
  };
});
const resolvedAnimation = computed(() => props.animation || POSITION_ANIMATION[props.position]);
const panelAnimationEnabled = computed(() => resolvedAnimation.value !== 'none');
const transitionName = computed(() => {
  const animation = resolvedAnimation.value;
  return BUILT_IN_ANIMATIONS.has(animation as PopupAnimation) ? `ky-popup-${animation}` : animation;
});
const popupStyle = computed(() => ({
  zIndex: String(props.zIndex),
  '--ky-popup-enter-duration': `${transitionDuration.value.enter}ms`,
  '--ky-popup-leave-duration': `${transitionDuration.value.leave}ms`,
}));

// 先挂载外层和面板，再在下一帧切换显示状态，确保首次打开也会触发 Vue Transition。
const rendered = ref(!props.destroyOnClose || isVisible.value);
const overlayVisible = ref(false);
const panelVisible = ref(false);
const panel = ref<HTMLElement | null>(null);
let visibilityTaskId = 0;

// 依据对外显示状态锁定滚动，不延长到退出动画，保持原组件行为。
const shouldLockScroll = computed(() => props.lockScroll && isVisible.value);
useLockScroll(shouldLockScroll);

watch(
  isVisible,
  (value, oldValue) => {
    const taskId = ++visibilityTaskId;

    if (value) {
      rendered.value = true;
      if (!oldValue) emit('open');

      void nextTick(() => {
        if (taskId !== visibilityTaskId || !isVisible.value) return;
        overlayVisible.value = true;
        panelVisible.value = true;
      });
      return;
    }

    const hasStartedTransition = overlayVisible.value || panelVisible.value;
    panelVisible.value = false;
    overlayVisible.value = false;

    // 若打开后在 nextTick 前立即关闭，不会产生 transitionend，需要直接完成清理。
    if (!hasStartedTransition && oldValue) {
      if (props.destroyOnClose) rendered.value = false;
      emit('closed');
    }
  },
  { immediate: true },
);

function handleAfterEnter() {
  if (isVisible.value && panelVisible.value) emit('opened');
}

function handleAfterLeave() {
  if (isVisible.value) return;
  if (props.destroyOnClose) rendered.value = false;
  emit('closed');
}

function close() {
  emit('update:modelValue', false);
  emit('close');
}

function handleOverlayClick() {
  emit('clickOverlay');
  if (props.overlay && props.closeOnOverlay) close();
}

defineExpose({ close, panel });
</script>
