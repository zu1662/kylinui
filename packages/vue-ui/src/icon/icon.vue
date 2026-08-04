<template>
  <span
    class="ky-icon"
    :class="{ 'is-spinning': spin }"
    :style="iconStyle"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
  >
    <slot>
      <svg v-if="paths.length" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          v-for="(path, index) in paths"
          :key="index"
          :d="path"
          stroke="currentColor"
          :stroke-width="strokeWidth"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </slot>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { resolveIconPaths, resolveIconSize, type IconProps } from './icon';

defineOptions({ name: 'KyIcon' });
const props = withDefaults(defineProps<IconProps>(), {
  size: 20,
  color: 'currentColor',
  strokeWidth: 2,
  rotate: 0,
  spin: false,
});
const paths = computed(() => resolveIconPaths(props.name));
const iconStyle = computed(() => ({
  width: resolveIconSize(props.size),
  height: resolveIconSize(props.size),
  color: props.color,
  transform: props.rotate ? `rotate(${props.rotate}deg)` : undefined,
}));
</script>
