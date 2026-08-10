<template>
  <button
    class="ky-button"
    :class="[
      `ky-button--${resolvedVariant}`,
      `ky-button--${resolvedSize}`,
      {
        'is-block': block || list,
        'is-loading': loading,
        'is-plain': plain,
        'has-shadow': shadow,
        'has-subtitle': resolvedSubtitle,
        'has-left-subtitle': resolvedSubtitlePosition === 'left',
      },
    ]"
    :type="nativeType"
    :disabled="disabled || loading"
    :aria-busy="loading"
    @click="handleClick"
  >
    <KyIconX v-if="loading" class="ky-button__spinner" name="loading" :size="16" spin />
    <span v-else-if="$slots.icon || icon" class="ky-button__icon" aria-hidden="true">
      <slot name="icon"><KyIconX v-if="icon" :name="icon" :size="16" /></slot>
    </span>
    <span class="ky-button__content">
      <span class="ky-button__label"><slot /></span>
      <span v-if="resolvedSubtitle" class="ky-button__subtitle">{{ resolvedSubtitle }}</span>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import KyIconX from '../iconx';
import { resolveButtonSize, resolveButtonVariant, type ButtonProps } from './button';

defineOptions({ name: 'KyButton' });
const props = withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button',
  subtitlePosition: 'bottom',
});
const emit = defineEmits<{ click: [event: MouseEvent] }>();

const resolvedVariant = computed(() => resolveButtonVariant(props.variant));
const resolvedSize = computed(() => resolveButtonSize(props.size));
const resolvedSubtitle = computed(() => props.subtitle ?? '');
const resolvedSubtitlePosition = computed(() => props.subtitlePosition ?? 'bottom');

// loading 与 disabled 状态都拦截点击，避免业务侧收到重复事件。
function handleClick(event: MouseEvent) {
  if (!props.disabled && !props.loading) emit('click', event);
}
</script>
