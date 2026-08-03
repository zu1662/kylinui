<template>
  <div class="ky-stepper" :aria-label="label">
    <button type="button" :disabled="disabled || modelValue <= min" aria-label="减少" @click="change(-step)">−</button>
    <input :value="modelValue" type="number" :min="min" :max="max" :step="step" :disabled="disabled" :aria-label="label" @change="inputChange" />
    <button type="button" :disabled="disabled || modelValue >= max" aria-label="增加" @click="change(step)">+</button>
  </div>
</template>

<script setup lang="ts">
import { normalizeStepper } from './stepper';
import type { StepperProps } from './stepper';

defineOptions({ name: 'KyStepper' });
const props = withDefaults(defineProps<StepperProps>(), { modelValue: 0, min: 0, max: 99, step: 1, label: '数量' });
const emit = defineEmits<{ 'update:modelValue': [number]; change: [number] }>();

// 按钮和手动输入共用同一归一化逻辑，避免步长与边界行为不一致。
function set(value: number) {
  const normalized = normalizeStepper(value, props.min, props.max, props.step);
  emit('update:modelValue', normalized);
  emit('change', normalized);
}
function change(delta: number) {
  set(props.modelValue + delta);
}
function inputChange(event: Event) {
  set(Number((event.target as HTMLInputElement).value));
}
</script>
