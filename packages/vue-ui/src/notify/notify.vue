<template>
  <Teleport :to="teleportTarget" :disabled="resolvedTeleport === false">
    <Transition
      appear
      name="ky-notify-slide"
      @after-enter="emit('opened')"
      @after-leave="handleAfterLeave"
    >
      <div
        v-if="show"
        class="ky-notify"
        :class="notifyClass"
        :style="notifyStyle"
        :role="type === 'danger' || type === 'warning' ? 'alert' : 'status'"
        :aria-live="type === 'danger' || type === 'warning' ? 'assertive' : 'polite'"
        @click="handleClick"
      >
        <slot name="icon">
          <KyIcon
            v-if="showIcon"
            class="ky-notify__icon"
            :name="resolvedIcon"
            source="iconfont"
            :size="20"
          />
        </slot>
        <div class="ky-notify__message">
          <slot>{{ message }}</slot>
        </div>
        <div v-if="$slots.action" class="ky-notify__action">
          <slot name="action" :close="requestClose" />
        </div>
        <button
          v-if="closeable"
          class="ky-notify__close"
          type="button"
          aria-label="关闭通知"
          @click.stop="requestClose"
        >
          <KyIcon :name="closeIcon" source="iconfont" :size="18" />
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount, ref, watch } from 'vue';
import { CONFIG_PROVIDER_KEY } from '../config-provider';
import KyIcon from '../icon';
import { getGlobalTeleport } from '../shared/global-config-provider';
import { getGlobalZIndex } from '../shared/global-z-index';
import { getOverlayContainer, useOverlayManager } from '../shared/overlay-manager';
import type { NotifyProps, NotifyType } from './notify';

defineOptions({ name: 'KyNotify' });

const props = withDefaults(defineProps<NotifyProps>(), {
  show: false,
  message: '',
  type: 'primary',
  duration: 3000,
  position: 'top',
  offset: 0,
  zIndex: undefined,
  icon: '',
  showIcon: true,
  closeable: false,
  closeIcon: 'close',
  closeOnClick: false,
  safeAreaInsetTop: true,
  safeAreaInsetBottom: true,
  teleport: undefined,
  className: '',
});
const emit = defineEmits<{
  'update:show': [value: boolean];
  opened: [];
  close: [];
  closed: [];
  click: [event: MouseEvent];
}>();
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
const blocksInteraction = computed(() => false);
const { zIndex: resolvedZIndex } = useOverlayManager({
  active: layerActive,
  baseZIndex,
  blocksInteraction,
});

let timer: ReturnType<typeof setTimeout> | undefined;
const defaultIcons: Record<NotifyType, string> = {
  primary: 'information',
  success: 'checked',
  warning: 'warning',
  danger: 'clear',
};
const resolvedIcon = computed(() => props.icon || defaultIcons[props.type]);
const normalizedOffset = computed(() =>
  typeof props.offset === 'number' ? `${props.offset}px` : props.offset,
);
const notifyStyle = computed(() => ({
  zIndex: String(resolvedZIndex.value),
  [props.position]: normalizedOffset.value,
}));
const notifyClass = computed(() => [
  `ky-notify--${props.type}`,
  `ky-notify--${props.position}`,
  props.className,
  {
    'ky-notify--safe-top': props.position === 'top' && props.safeAreaInsetTop,
    'ky-notify--safe-bottom': props.position === 'bottom' && props.safeAreaInsetBottom,
  },
]);

function clearTimer() {
  if (!timer) return;
  clearTimeout(timer);
  timer = undefined;
}

function startTimer() {
  clearTimer();
  if (!props.show || props.duration <= 0) return;
  timer = setTimeout(requestClose, props.duration);
}

function requestClose() {
  if (!props.show) return;
  clearTimer();
  emit('close');
  emit('update:show', false);
}

function handleClick(event: MouseEvent) {
  emit('click', event);
  if (props.closeOnClick) requestClose();
}

function handleAfterLeave() {
  layerActive.value = false;
  emit('closed');
}

watch(
  () => [props.show, props.message, props.duration] as const,
  ([show]) => {
    if (show) layerActive.value = true;
    startTimer();
  },
  { immediate: true },
);

onBeforeUnmount(clearTimer);
</script>
