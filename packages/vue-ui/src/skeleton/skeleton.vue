<template>
  <div
    v-if="loading"
    class="ky-skeleton"
    :class="{ 'is-animated': animate, 'is-round': round }"
    aria-busy="true"
    aria-label="内容加载中"
  >
    <div
      v-if="avatar"
      class="ky-skeleton__avatar"
      :class="`ky-skeleton__avatar--${avatarShape}`"
      :style="avatarStyle"
    />
    <div class="ky-skeleton__content">
      <div v-if="title" class="ky-skeleton__title" :style="{ width: width(titleWidth) }" />
      <div class="ky-skeleton__rows">
        <div
          v-for="index in normalizedRows"
          :key="index"
          class="ky-skeleton__row"
          :style="{ width: rowWidthAt(index - 1) }"
        />
      </div>
    </div>
  </div>
  <slot v-else />
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { SkeletonProps, SkeletonSize } from './skeleton';
defineOptions({ name: 'KySkeleton' });
const props = withDefaults(defineProps<SkeletonProps>(), {
  loading: true,
  animate: true,
  round: false,
  title: false,
  titleWidth: '40%',
  row: 3,
  rowWidth: undefined,
  avatar: false,
  avatarSize: 40,
  avatarShape: 'round',
});
const normalizedRows = computed(() => Math.max(0, Math.floor(props.row)));
function width(value: SkeletonSize) {
  return typeof value === 'number' ? `${value}%` : value;
}
function size(value: SkeletonSize) {
  return typeof value === 'number' ? `${value}px` : value;
}
function rowWidthAt(index: number) {
  if (Array.isArray(props.rowWidth)) {
    const value = props.rowWidth[index] ?? props.rowWidth.at(-1) ?? '100%';
    return width(value);
  }
  if (props.rowWidth !== undefined) return width(props.rowWidth);
  return index === normalizedRows.value - 1 ? '60%' : '100%';
}
const avatarStyle = computed(() => ({
  width: size(props.avatarSize),
  height: size(props.avatarSize),
}));
</script>
