<template>
  <button
    class="ky-button"
    :class="[
      `ky-button--${variant}`,
      `ky-button--${size}`,
      { 'is-block': block, 'is-loading': loading, 'has-subtitle': subtitle },
    ]"
    :type="nativeType"
    :disabled="disabled || loading"
    :aria-busy="loading"
    @click="handleClick"
  >
    <span v-if="loading" class="ky-button__spinner" aria-hidden="true" />
    <span v-if="$slots.icon && !loading" class="ky-button__icon"><slot name="icon" /></span>
    <span class="ky-button__content">
      <span class="ky-button__label"><slot /></span>
      <span v-if="subtitle" class="ky-button__subtitle">{{ subtitle }}</span>
    </span>
  </button>
</template>

<script setup lang="ts">
import type { ButtonProps } from './button';

defineOptions({ name: 'KyButton' });
const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'medium',
  nativeType: 'button',
});
const emit = defineEmits<{ click: [event: MouseEvent] }>();

// loading 与 disabled 状态统一拦截业务点击，避免重复提交。
function handleClick(event: MouseEvent) {
  if (!props.disabled && !props.loading) emit('click', event);
}
</script>
