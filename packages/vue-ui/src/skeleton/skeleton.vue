<template>
  <div
    v-if="loading"
    class="ky-skeleton"
    :class="['ky-skeleton--' + preset, { 'is-animated': animate, 'is-round': round }]"
    aria-busy="true"
    :aria-label="locale.skeletonLoadingLabel"
  >
    <template v-if="preset === 'list'">
      <div v-for="index in normalizedListCount" :key="index" class="ky-skeleton__list-item">
        <div
          v-if="effectiveAvatar"
          class="ky-skeleton__avatar"
          :class="'ky-skeleton__avatar--' + avatarShape"
          :style="avatarStyle"
        />
        <div class="ky-skeleton__content">
          <div
            v-if="effectiveTitle"
            class="ky-skeleton__title"
            :style="{ width: width(titleWidth) }"
          />
          <div v-if="normalizedRows" class="ky-skeleton__rows">
            <div
              v-for="rowIndex in normalizedRows"
              :key="rowIndex"
              class="ky-skeleton__row"
              :style="{ width: rowWidthAt(rowIndex - 1) }"
            />
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div
        v-if="effectiveAvatar"
        class="ky-skeleton__avatar"
        :class="'ky-skeleton__avatar--' + avatarShape"
        :style="avatarStyle"
      />
      <div v-if="effectiveTitle || normalizedRows" class="ky-skeleton__content">
        <div
          v-if="effectiveTitle"
          class="ky-skeleton__title"
          :style="{ width: width(titleWidth) }"
        />
        <div v-if="normalizedRows" class="ky-skeleton__rows">
          <div
            v-for="index in normalizedRows"
            :key="index"
            class="ky-skeleton__row"
            :style="{ width: rowWidthAt(index - 1) }"
          />
        </div>
      </div>
    </template>
  </div>
  <slot v-else />
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useConfigProvider } from '../config-provider';
import type { SkeletonProps, SkeletonSize } from './skeleton';
defineOptions({ name: 'KySkeleton' });
const props = withDefaults(defineProps<SkeletonProps>(), {
  loading: true,
  animate: true,
  preset: 'custom',
  listCount: 3,
  round: false,
  title: false,
  titleWidth: '40%',
  row: 3,
  rowWidth: undefined,
  avatar: false,
  avatarSize: 40,
  avatarShape: 'round',
});
const { locale } = useConfigProvider();
const effectiveAvatar = computed(() =>
  props.preset === 'avatar' || props.preset === 'list' ? true : props.avatar,
);
const effectiveTitle = computed(() =>
  props.preset === 'title' || props.preset === 'list' ? true : props.title,
);
const normalizedRows = computed(() => {
  if (props.preset === 'avatar' || props.preset === 'title') return 0;
  if (props.preset === 'paragraph') return 3;
  if (props.preset === 'list') return 2;
  return Math.max(0, Math.floor(props.row));
});
const normalizedListCount = computed(() => Math.max(1, Math.floor(props.listCount)));
function width(value: SkeletonSize) {
  return typeof value === 'number' ? value + '%' : value;
}
function size(value: SkeletonSize) {
  return typeof value === 'number' ? value + 'px' : value;
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
