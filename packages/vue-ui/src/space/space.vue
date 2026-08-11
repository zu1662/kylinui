<template>
  <div
    class="ky-space"
    :class="[`ky-space--${direction}`, `ky-space--${align}`, { 'is-wrap': wrap, 'is-fill': fill }]"
    :style="spaceStyle"
  >
    <slot />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { SpaceProps } from './space';
defineOptions({ name: 'KySpace' });
const props = withDefaults(defineProps<SpaceProps>(), {
  direction: 'horizontal',
  size: 'small',
  align: 'center',
  wrap: false,
  fill: false,
});
const sizes = { mini: '4px', small: '8px', medium: '12px', large: '16px' };
const unit = (value: number | string) =>
  typeof value === 'number' ? `${value}px` : (sizes[value as keyof typeof sizes] ?? value);
const spaceStyle = computed(() => {
  const pair = Array.isArray(props.size) ? props.size : [props.size, props.size];
  return { columnGap: unit(pair[0]), rowGap: unit(pair[1]) };
});
</script>
