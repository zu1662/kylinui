<template>
  <div
    class="ky-circle"
    :style="rootStyle"
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="normalized"
  >
    <svg class="ky-circle__svg" viewBox="0 0 100 100" aria-hidden="true">
      <circle class="ky-circle__track" cx="50" cy="50" :r="radius" :style="trackStyle" />
      <circle class="ky-circle__portion" cx="50" cy="50" :r="radius" :style="portionStyle" /></svg
    ><span v-if="showText || $slots.default" class="ky-circle__text"
      ><slot :percentage="normalized">{{ normalized }}%</slot></span
    >
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { CircleProps } from './circle';
defineOptions({ name: 'KyCircle' });
const props = withDefaults(defineProps<CircleProps>(), {
  percentage: 0,
  size: 100,
  strokeWidth: 8,
  color: '',
  trackColor: '',
  clockwise: true,
  showText: true,
});
const normalized = computed(() => Math.round(Math.min(100, Math.max(0, props.percentage))));
const stroke = computed(() => Math.min(30, Math.max(1, props.strokeWidth)));
const radius = computed(() => 50 - stroke.value / 2);
const circumference = computed(() => 2 * Math.PI * radius.value);
const unit = (value: number | string) => (typeof value === 'number' ? `${value}px` : value);
const rootStyle = computed(() => ({ width: unit(props.size), height: unit(props.size) }));
const trackStyle = computed(() => ({
  strokeWidth: stroke.value,
  stroke: props.trackColor || undefined,
}));
const portionStyle = computed(() => ({
  strokeWidth: stroke.value,
  stroke: props.color || undefined,
  strokeDasharray: circumference.value,
  strokeDashoffset: circumference.value * (1 - normalized.value / 100),
  transform: props.clockwise ? 'rotate(-90deg)' : 'rotate(-90deg) scaleX(-1)',
}));
</script>
