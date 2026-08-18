<template>
  <Teleport :to="teleportTarget" :disabled="resolvedTeleport === false">
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
import { computed, inject, nextTick, ref, watch } from 'vue';
import { CONFIG_PROVIDER_KEY } from '../config-provider';
import { getGlobalTeleport } from '../shared/global-config-provider';
import { getGlobalZIndex } from '../shared/global-z-index';
import { getOverlayContainer, useOverlayManager } from '../shared/overlay-manager';
import type { PopupAnimation, PopupDuration, PopupProps } from './popup';

defineOptions({ name: 'KyPopup' });
const props = withDefaults(defineProps<PopupProps>(), {
  position: 'center',
  overlay: true,
  closeOnOverlay: true,
  lockScroll: true,
  closeOnPopstate: true,
  round: false,
  safeArea: true,
  destroyOnClose: true,
  teleport: undefined,
  zIndex: undefined,
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

const configProvider = inject(CONFIG_PROVIDER_KEY, undefined);
const isVisible = computed(() => Boolean(props.modelValue));
const resolvedTeleport = computed(
  () =>
    props.teleport ?? configProvider?.teleport.value ?? getGlobalTeleport(getOverlayContainer()),
);
const teleportTarget = computed(() =>
  resolvedTeleport.value === false ? 'body' : resolvedTeleport.value,
);
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
const baseZIndex = computed(() => props.zIndex ?? getGlobalZIndex(900));
const popupStyle = computed(() => ({
  zIndex: String(resolvedZIndex.value),
  '--ky-popup-enter-duration': `${transitionDuration.value.enter}ms`,
  '--ky-popup-leave-duration': `${transitionDuration.value.leave}ms`,
}));

// 先挂载外层和面板，再在下一帧切换显示状态，确保首次打开也会触发 Vue Transition。
const rendered = ref(!props.destroyOnClose || isVisible.value);
const layerActive = ref(isVisible.value);
const overlayVisible = ref(false);
const panelVisible = ref(false);
const panel = ref<HTMLElement | null>(null);
let visibilityTaskId = 0;

// 浮层退出动画结束前仍保持滚动锁，避免面板离场时页面内容提前恢复滚动。
const shouldLockScroll = computed(() => props.lockScroll);
const shouldCloseOnPopstate = computed(() => props.closeOnPopstate !== false);
const { zIndex: resolvedZIndex, isTop } = useOverlayManager({
  active: layerActive,
  baseZIndex,
  lockScroll: shouldLockScroll,
  closeOnPopstate: shouldCloseOnPopstate,
  onPopstate: close,
});

watch(
  isVisible,
  (value, oldValue) => {
    const taskId = ++visibilityTaskId;

    if (value) {
      layerActive.value = true;
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
      layerActive.value = false;
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
  layerActive.value = false;
  emit('closed');
}

function close() {
  if (!isVisible.value) return;
  emit('update:modelValue', false);
  emit('close');
}

function handleOverlayClick() {
  if (!isTop.value) return;
  emit('clickOverlay');
  if (props.overlay && props.closeOnOverlay) close();
}

defineExpose({ close, panel });
</script>
