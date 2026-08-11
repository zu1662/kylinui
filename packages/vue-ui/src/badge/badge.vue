<template>
  <span class="ky-badge"
    ><slot /><sup
      v-if="visible"
      class="ky-badge__content"
      :class="[`ky-badge__content--${position}`, { 'is-dot': dot, 'is-fixed': hasDefaultSlot }]"
      :style="badgeStyle"
      role="status"
      :aria-label="ariaLabel"
      ><slot name="content">{{ displayContent }}</slot></sup
    ></span
  >
</template>
<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { BadgeProps } from './badge';
defineOptions({ name: 'KyBadge' });
const props = withDefaults(defineProps<BadgeProps>(), {
  content: '',
  max: 99,
  dot: false,
  showZero: true,
  position: 'top-right',
  color: '',
  offset: () => [0, 0],
});
const slots = useSlots();
const hasDefaultSlot = computed(() => Boolean(slots.default));
const visible = computed(
  () => props.dot || (props.content !== '' && (props.showZero || Number(props.content) !== 0)),
);
const displayContent = computed(() =>
  props.dot
    ? ''
    : typeof props.content === 'number' && props.content > props.max
      ? `${props.max}+`
      : props.content,
);
const unit = (value: number | string) => (typeof value === 'number' ? `${value}px` : value);
const badgeStyle = computed(() => ({
  backgroundColor: props.color || undefined,
  '--ky-badge-offset-x': unit(props.offset[0]),
  '--ky-badge-offset-y': unit(props.offset[1]),
}));
const ariaLabel = computed(() => (props.dot ? '有新消息' : String(displayContent.value)));
</script>
