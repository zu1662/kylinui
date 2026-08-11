<template>
  <div
    class="ky-progress"
    :style="trackStyle"
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="normalized"
  >
    <span class="ky-progress__portion" :style="portionStyle"
      ><span v-if="showPivot" class="ky-progress__pivot" :style="pivotStyle">{{
        pivotText || `${normalized}%`
      }}</span></span
    >
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { ProgressProps } from './progress';
defineOptions({ name: 'KyProgress' });
const props = withDefaults(defineProps<ProgressProps>(), {
  percentage: 0,
  strokeWidth: 8,
  color: '',
  trackColor: '',
  pivotText: '',
  pivotColor: '',
  showPivot: true,
  inactive: false,
});
const normalized = computed(() => Math.min(100, Math.max(0, props.percentage)));
const unit = (value: number | string) => (typeof value === 'number' ? `${value}px` : value);
const trackStyle = computed(() => ({
  height: unit(props.strokeWidth),
  background: props.trackColor || undefined,
}));
const portionStyle = computed(() => ({
  width: `${normalized.value}%`,
  background: props.inactive ? 'var(--ky-color-text-disabled)' : props.color || undefined,
}));
const pivotStyle = computed(() => ({ background: props.pivotColor || props.color || undefined }));
</script>
