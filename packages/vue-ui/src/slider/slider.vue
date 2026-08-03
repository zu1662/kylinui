<template>
  <label class="ky-slider" :class="{ 'is-disabled': disabled }">
    <span class="ky-slider__header"
      ><span>{{ label }}</span
      ><output v-if="showValue">{{ modelValue }}</output></span
    >
    <input
      :value="modelValue"
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :style="trackStyle"
      @input="update"
    />
    <span class="ky-slider__scale"
      ><span>{{ min }}</span
      ><span>{{ max }}</span></span
    >
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { clamp } from './slider';
import type { SliderProps } from './slider';

defineOptions({ name: 'KySlider' });
const props = withDefaults(defineProps<SliderProps>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1,
  showValue: true,
  label: '数值',
});
const emit = defineEmits<{ 'update:modelValue': [number]; change: [number] }>();
const trackStyle = computed(() => {
  const range = props.max - props.min;
  const progress = range === 0 ? 0 : ((props.modelValue - props.min) / range) * 100;
  return { '--ky-slider-progress': `${progress}%` };
});

// 原生 range 保留方向键能力，视觉轨道只读取归一化后的进度变量。
function update(event: Event) {
  const value = clamp(Number((event.target as HTMLInputElement).value), props.min, props.max);
  emit('update:modelValue', value);
  emit('change', value);
}
</script>
