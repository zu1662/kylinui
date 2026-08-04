<template>
  <Teleport :to="teleportTarget" :disabled="teleport === false">
    <Transition
      name="ky-popup-fade"
      :duration="duration"
      @after-enter="emit('opened')"
      @after-leave="emit('closed')"
    >
      <div
        v-if="isVisible || !destroyOnClose"
        v-show="isVisible"
        class="ky-popup"
        :class="[`ky-popup--${position}`, { 'ky-popup--without-overlay': !overlay }]"
        :style="popupStyle"
        @click.self="handleOverlayClick"
      >
        <Transition :name="transitionName" :duration="duration">
          <section
            v-show="isVisible"
            class="ky-popup__panel"
            :class="{ 'is-round': round, 'is-safe-area': safeArea }"
            role="dialog"
            aria-modal="true"
            :aria-label="ariaLabel"
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
import { computed, watch } from 'vue';
import { useLockScroll } from '../shared/use-lock-scroll';
import type { PopupProps } from './popup';

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
  duration: 220,
  ariaLabel: '弹出层',
});
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'update:visible': [value: boolean];
  open: [];
  opened: [];
  close: [];
  closed: [];
  clickOverlay: [];
}>();

// 同时兼容 modelValue 与 visible，便于旧业务平滑迁移到统一 API。
const isVisible = computed(() => Boolean(props.modelValue || props.visible));
const teleportTarget = computed(() => (props.teleport === false ? 'body' : props.teleport));
const popupStyle = computed(() => ({
  zIndex: String(props.zIndex),
  '--ky-popup-duration': `${props.duration}ms`,
}));
const transitionName = computed(() =>
  props.position === 'center' ? 'ky-popup-zoom' : `ky-popup-slide-${props.position}`,
);

// 仅在弹层可见且启用锁定时禁止背景页面滚动。
const shouldLockScroll = computed(() => props.lockScroll && isVisible.value);
useLockScroll(shouldLockScroll);

watch(isVisible, (value, oldValue) => {
  if (value && !oldValue) emit('open');
});

function close() {
  emit('update:modelValue', false);
  emit('update:visible', false);
  emit('close');
}

function handleOverlayClick() {
  emit('clickOverlay');
  if (props.overlay && props.closeOnOverlay) close();
}

defineExpose({ close });
</script>
