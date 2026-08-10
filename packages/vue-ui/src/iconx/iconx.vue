<template>
  <i
    class="ky-iconx"
    :class="[`ky-iconx--${normalizedName}`, { 'is-spinning': spin }]"
    :style="iconStyle"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { normalizeIconXName, resolveIconXSize, type IconXProps } from './iconx';

defineOptions({ name: 'KyIconX' });
const props = withDefaults(defineProps<IconXProps>(), {
  size: 20,
  color: 'currentColor',
  rotate: 0,
  spin: false,
});

const normalizedName = computed(() => normalizeIconXName(props.name));
const iconStyle = computed(() => ({
  fontSize: resolveIconXSize(props.size),
  color: props.color,
  transform: props.rotate ? `rotate(${props.rotate}deg)` : undefined,
}));
</script>
