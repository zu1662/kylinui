<template>
  <div class="ky-stepper" :class="{ 'is-disabled': disabled }" role="group" :aria-label="label">
    <button
      type="button"
      :disabled="disabled || modelValue <= min"
      aria-label="减少数量"
      @click="change(-step, 'minus')"
    >
      <KyIconX name="reduce" :size="20" />
    </button>
    <input
      :value="modelValue"
      type="number"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :readonly="readonly || !inputAllowed"
      :aria-label="label"
      @change="inputChange"
      @keydown.enter="inputChange"
    />
    <button
      type="button"
      :disabled="disabled || modelValue >= max"
      aria-label="增加数量"
      @click="change(step, 'plus')"
    >
      <KyIconX name="plus1" :size="20" />
    </button>
  </div>
</template>

<script setup lang="ts">
import KyIconX from '../iconx';
import { normalizeStepper, type StepperProps } from './stepper';

defineOptions({ name: 'KyStepper' });
const props = withDefaults(defineProps<StepperProps>(), {
  modelValue: 0,
  min: 0,
  max: 99,
  step: 1,
  inputAllowed: true,
  label: '数量',
});
const emit = defineEmits<{
  'update:modelValue': [value: number];
  change: [value: number];
  minus: [value: number];
  plus: [value: number];
  overlimit: [direction: 'min' | 'max'];
}>();

// 所有输入统一经过归一化，确保非零最小值、小数步长和精度规则一致。
function set(value: number, source?: 'minus' | 'plus') {
  const normalized = normalizeStepper(value, props.min, props.max, props.step, props.decimalPlaces);
  emit('update:modelValue', normalized);
  emit('change', normalized);
  if (source === 'minus') emit('minus', normalized);
  if (source === 'plus') emit('plus', normalized);
}

function change(delta: number, source: 'minus' | 'plus') {
  const next = props.modelValue + delta;
  if (next < props.min) {
    emit('overlimit', 'min');
    return;
  }
  if (next > props.max) {
    emit('overlimit', 'max');
    return;
  }
  set(next, source);
}

function inputChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const next = normalizeStepper(
    Number(input.value),
    props.min,
    props.max,
    props.step,
    props.decimalPlaces,
  );
  input.value = String(next);
  set(next);
}
</script>
