<template>
  <div
    ref="root"
    class="ky-sticky"
    :class="[`ky-sticky--${position}`, { 'is-stuck': stuck }]"
    :style="rootStyle"
  >
    <slot :stuck="stuck" />
  </div>
</template>
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { StickyProps } from './sticky';
defineOptions({ name: 'KySticky' });
const props = withDefaults(defineProps<StickyProps>(), { position: 'top', offset: 0, zIndex: 20 });
const emit = defineEmits<{ change: [stuck: boolean] }>();
const root = ref<HTMLElement | null>(null);
const stuck = ref(false);
let frame = 0;
let scrollParent: HTMLElement | Window = window;
const unit = (value: number | string) => (typeof value === 'number' ? `${value}px` : value);
const numericOffset = computed(() =>
  typeof props.offset === 'number' ? props.offset : Number.parseFloat(props.offset) || 0,
);
const rootStyle = computed(() => ({ [props.position]: unit(props.offset), zIndex: props.zIndex }));
function getScrollParent(element: HTMLElement) {
  let parent = element.parentElement;
  while (parent) {
    const { overflowY } = window.getComputedStyle(parent);
    if (/(auto|scroll|overlay|hidden)/.test(overflowY)) return parent;
    parent = parent.parentElement;
  }
  return window;
}
function getBoundary() {
  if (scrollParent === window) {
    return props.position === 'top'
      ? numericOffset.value
      : window.innerHeight - numericOffset.value;
  }
  const container = scrollParent as HTMLElement;
  const rect = container.getBoundingClientRect();
  // 粘性定位以滚动容器的内边界为基准，不能直接使用视口边界判断吸附状态。
  return props.position === 'top'
    ? rect.top + container.clientTop + numericOffset.value
    : rect.top + container.clientTop + container.clientHeight - numericOffset.value;
}
function measure() {
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    if (!root.value) return;
    const rect = root.value.getBoundingClientRect();
    const boundary = getBoundary();
    const next =
      props.position === 'top'
        ? Math.abs(rect.top - boundary) < 1.5
        : Math.abs(rect.bottom - boundary) < 1.5;
    if (next !== stuck.value) {
      stuck.value = next;
      emit('change', next);
    }
  });
}
onMounted(() => {
  if (root.value) scrollParent = getScrollParent(root.value);
  window.addEventListener('scroll', measure, true);
  window.addEventListener('resize', measure);
  measure();
});
watch(
  () => [props.position, props.offset],
  () => nextTick(measure),
);
onBeforeUnmount(() => {
  cancelAnimationFrame(frame);
  window.removeEventListener('scroll', measure, true);
  window.removeEventListener('resize', measure);
});
</script>
