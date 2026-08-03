<template>
  <label
    class="ky-switch"
    :class="[`ky-switch--${size}`, { 'is-checked': modelValue, 'is-disabled': disabled }]"
  >
    <span class="ky-switch__label"
      ><slot>{{ label }}</slot></span
    >
    <input
      type="checkbox"
      role="switch"
      :checked="modelValue"
      :disabled="disabled"
      :aria-label="label"
      @change="update"
    />
    <span class="ky-switch__track" aria-hidden="true"><span class="ky-switch__thumb" /></span>
  </label>
</template>

<script setup lang="ts">
import type { SwitchProps } from './switch';

defineOptions({ name: 'KySwitch' });
withDefaults(defineProps<SwitchProps>(), { modelValue: false, size: 'medium' });
const emit = defineEmits<{ 'update:modelValue': [boolean]; change: [boolean] }>();

// 真实 checkbox 提供键盘切换能力，视觉轨道不接管交互事件。
function update(event: Event) {
  const value = (event.target as HTMLInputElement).checked;
  emit('update:modelValue', value);
  emit('change', value);
}
</script>
