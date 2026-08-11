<template>
  <div class="ky-grid" :class="{ 'is-bordered': border }" :style="gridStyle"><slot /></div>
</template>
<script setup lang="ts">
import { computed, provide, toRefs } from 'vue';
import type { GridProps } from './grid';
defineOptions({ name: 'KyGrid' });
const props = withDefaults(defineProps<GridProps>(), {
  columnNum: 4,
  gutter: 0,
  border: true,
  square: false,
  center: true,
  clickable: false,
});
const { square, center, clickable } = toRefs(props);
const unit = (value: number | string) => (typeof value === 'number' ? `${value}px` : value);
provide('ky-grid', { square, center, clickable });
const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${Math.max(1, props.columnNum)}, minmax(0, 1fr))`,
  gap: unit(props.gutter),
}));
</script>
