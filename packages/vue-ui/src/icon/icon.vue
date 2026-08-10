<template>
  <i
    v-if="useIconfont"
    class="ky-icon ky-icon--iconfont ky-icon-font"
    :class="[`ky-icon-font--${normalizedName}`, { 'is-spinning': spin }]"
    :style="iconStyle"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
  />
  <span
    v-else
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
import { isIconfontName } from './iconfont';
import { resolveIconPaths, resolveIconSize, type IconProps } from './icon';

defineOptions({ name: 'KyIcon' });
const props = withDefaults(defineProps<IconProps>(), {
  source: 'auto',
  size: 20,
  color: 'currentColor',
  strokeWidth: 2,
  rotate: 0,
  spin: false,
});
const normalizedName = computed(() => props.name.trim());
const paths = computed(() => resolveIconPaths(normalizedName.value));
const useIconfont = computed(
  () => props.source === 'iconfont' || (props.source === 'auto' && !paths.value.length && isIconfontName(normalizedName.value)),
);
const iconStyle = computed(() => ({
  width: resolveIconSize(props.size),
  height: resolveIconSize(props.size),
  fontSize: useIconfont.value ? resolveIconSize(props.size) : undefined,
  color: props.color,
  transform: props.rotate ? `rotate(${props.rotate}deg)` : undefined,
}));
</script>
