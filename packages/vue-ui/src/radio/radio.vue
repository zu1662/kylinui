<template>
  <label class="ky-radio" :class="{ 'is-checked': checked, 'is-disabled': disabled }">
    <input type="radio" :name="name" :value="String(value)" :checked="checked" :disabled="disabled" :aria-label="label" @change="select" />
    <span class="ky-radio__mark" aria-hidden="true"><i /></span>
    <span><slot>{{ label }}</slot></span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { RadioProps } from './radio';

defineOptions({ name: 'KyRadio' });
const props = defineProps<RadioProps>();
const emit = defineEmits<{ 'update:modelValue': [string | number | boolean]; change: [string | number | boolean] }>();
const checked = computed(() => props.modelValue === props.value);

// 组件保留原始 value 类型，避免 number 或 boolean 在事件中被字符串化。
function select() {
  if (!props.disabled) {
    emit('update:modelValue', props.value);
    emit('change', props.value);
  }
}
</script>
