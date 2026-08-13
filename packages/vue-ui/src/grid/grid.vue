<template>
  <div class="ky-grid" :style="gridStyle"><slot /></div>
</template>

<script setup lang="ts">
import { computed, provide, toRefs } from 'vue';
import { hasGridGutter, resolveGridColumnNum, resolveGridUnit, type GridProps } from './grid';
import { GRID_KEY } from './grid-context';

defineOptions({ name: 'KyGrid' });

const props = withDefaults(defineProps<GridProps>(), {
  columnNum: 4,
  gutter: 0,
  border: true,
  square: false,
  center: true,
  clickable: false,
  direction: 'vertical',
  reverse: false,
  iconSize: 28,
});

const { gutter, border, square, center, clickable, direction, reverse, iconSize } = toRefs(props);
const hasGutter = computed(() => hasGridGutter(props.gutter));

provide(GRID_KEY, {
  gutter,
  hasGutter,
  border,
  square,
  center,
  clickable,
  direction,
  reverse,
  iconSize,
});

const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${resolveGridColumnNum(props.columnNum)}, minmax(0, 1fr))`,
  gap: resolveGridUnit(props.gutter),
}));
</script>
