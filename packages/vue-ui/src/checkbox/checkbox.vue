<template>
  <label
    class="ky-checkbox"
    :class="{
      'is-checked': modelValue,
      'is-disabled': disabled,
      'is-indeterminate': indeterminate,
    }"
  >
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      :aria-label="label"
      :aria-checked="indeterminate ? 'mixed' : modelValue"
      @change="update"
    />
    <span class="ky-checkbox__mark" aria-hidden="true">
      <KyIconX :name="indeterminate ? 'reduce' : 'tick'" :size="14" />
    </span>
    <span
      ><slot>{{ label }}</slot></span
    >
  </label>
</template>

<script setup lang="ts">
import KyIconX from '../iconx';
import type { CheckboxProps } from './checkbox';

defineOptions({ name: 'KyCheckbox' });
withDefaults(defineProps<CheckboxProps>(), { modelValue: false });
const emit = defineEmits<{ 'update:modelValue': [boolean]; change: [boolean] }>();

// 原生表单语义与可见 label 同步，混合状态额外暴露 aria-checked="mixed"。
function update(event: Event) {
  const value = (event.target as HTMLInputElement).checked;
  emit('update:modelValue', value);
  emit('change', value);
}
</script>
