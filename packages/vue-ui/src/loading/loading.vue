<template>
  <span class="ky-loading" :class="{ 'is-vertical': vertical }" role="status" aria-live="polite"
    ><span class="ky-loading__spinner" :class="`ky-loading__spinner--${type}`" :style="spinnerStyle"
      ><i v-for="index in type === 'spinner' ? 12 : 0" :key="index" /></span
    ><span v-if="$slots.default" class="ky-loading__text" :style="textStyle"><slot /></span
  ></span>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { LoadingProps } from './loading';
defineOptions({ name: 'KyLoading' });
const props = withDefaults(defineProps<LoadingProps>(), {
  type: 'circular',
  size: 28,
  color: '',
  textColor: '',
  textSize: 14,
  vertical: false,
});
const unit = (value: number | string) => (typeof value === 'number' ? `${value}px` : value);
const spinnerStyle = computed(() => ({
  width: unit(props.size),
  height: unit(props.size),
  color: props.color || undefined,
}));
const textStyle = computed(() => ({
  color: props.textColor || undefined,
  fontSize: unit(props.textSize),
}));
</script>
