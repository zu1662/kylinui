<template>
  <Teleport :to="teleportTarget" :disabled="resolvedTeleport === false">
    <Transition name="ky-toast-fade" @after-enter="emit('opened')" @after-leave="handleAfterLeave">
      <div
        v-if="show"
        class="ky-toast-layer"
        :class="{ 'is-blocking': forbidClick || overlay, 'has-overlay': overlay }"
        :style="{ zIndex: String(resolvedZIndex) }"
      >
        <div
          class="ky-toast"
          :class="toastClass"
          :style="{ wordBreak: normalizedWordBreak }"
          :role="normalizedType === 'error' ? 'alert' : 'status'"
          :aria-live="normalizedType === 'error' ? 'assertive' : 'polite'"
          @click="handleToastClick"
        >
          <slot name="icon">
            <KyLoading
              v-if="normalizedType === 'loading' && !icon"
              class="ky-toast__loading"
              :type="loadingType"
              :size="iconSize"
              color="currentColor"
            />
            <img
              v-else-if="isImageIcon"
              class="ky-toast__image"
              :src="icon"
              :style="iconStyle"
              alt=""
            />
            <KyIcon
              v-else-if="resolvedIcon"
              class="ky-toast__icon"
              :name="resolvedIcon"
              :size="iconSize"
              source="iconfont"
            />
          </slot>
          <div v-if="$slots.message || hasMessage" class="ky-toast__text">
            <slot name="message">{{ message }}</slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount, ref, watch } from 'vue';
import { CONFIG_PROVIDER_KEY } from '../config-provider';
import KyIcon from '../icon';
import KyLoading from '../loading';
import { getGlobalTeleport } from '../shared/global-config-provider';
import { getGlobalZIndex } from '../shared/global-z-index';
import { getOverlayContainer, useOverlayManager } from '../shared/overlay-manager';
import type { ToastProps } from './toast';

defineOptions({ name: 'KyToast' });

const props = withDefaults(defineProps<ToastProps>(), {
  show: false,
  message: '',
  type: 'text',
  icon: '',
  iconSize: 'var(--ky-toast-icon-size)',
  loadingType: 'circular',
  duration: 2000,
  position: 'center',
  wordBreak: 'break-all',
  zIndex: undefined,
  forbidClick: false,
  overlay: false,
  closeOnClick: false,
  teleport: undefined,
  className: '',
});
const configProvider = inject(CONFIG_PROVIDER_KEY, undefined);
const resolvedTeleport = computed(
  () =>
    props.teleport ?? configProvider?.teleport.value ?? getGlobalTeleport(getOverlayContainer()),
);
const teleportTarget = computed(() =>
  resolvedTeleport.value === false ? 'body' : resolvedTeleport.value,
);
const baseZIndex = computed(() => props.zIndex ?? getGlobalZIndex(1000));
const layerActive = ref(props.show);
const blocksInteraction = computed(() => props.forbidClick || props.overlay);
const { zIndex: resolvedZIndex } = useOverlayManager({
  active: layerActive,
  baseZIndex,
  blocksInteraction,
});
const emit = defineEmits<{
  'update:show': [value: boolean];
  opened: [];
  closed: [];
  click: [event: MouseEvent];
}>();

let timer: ReturnType<typeof setTimeout> | undefined;
const normalizedType = computed(() => (props.type === 'fail' ? 'error' : props.type));
const normalizedPosition = computed(() =>
  props.position === 'middle' ? 'center' : props.position,
);
const normalizedWordBreak = computed(() =>
  props.wordBreak === 'break-word' ? 'break-word' : props.wordBreak,
);
const hasMessage = computed(() => props.message !== '');
const iconStyle = computed(() => {
  const size = typeof props.iconSize === 'number' ? `${props.iconSize}px` : props.iconSize;
  return { width: size, height: size };
});
const isImageIcon = computed(
  () => /^(https?:)?\/\//.test(props.icon) || props.icon.startsWith('data:'),
);
const resolvedIcon = computed(() => {
  if (props.icon && !isImageIcon.value) return props.icon;
  if (normalizedType.value === 'success') return 'checked';
  if (normalizedType.value === 'error') return 'clear';
  return '';
});
const toastClass = computed(() => [
  `ky-toast--${normalizedType.value}`,
  `ky-toast--${normalizedPosition.value}`,
  `ky-toast--break-${props.wordBreak}`,
  {
    'ky-toast--icon': Boolean(
      resolvedIcon.value || isImageIcon.value || normalizedType.value === 'loading',
    ),
  },
  props.className,
]);

function clearTimer() {
  if (timer) clearTimeout(timer);
  timer = undefined;
}

function close() {
  clearTimer();
  emit('update:show', false);
}

function handleAfterLeave() {
  layerActive.value = false;
  emit('closed');
}

function handleToastClick(event: MouseEvent) {
  emit('click', event);
  if (props.closeOnClick) close();
}

watch(
  () => [props.show, props.message, props.duration],
  () => {
    clearTimer();
    if (props.show) layerActive.value = true;
    if (props.show && props.duration > 0) timer = setTimeout(close, props.duration);
  },
  { immediate: true },
);

onBeforeUnmount(clearTimer);
</script>
