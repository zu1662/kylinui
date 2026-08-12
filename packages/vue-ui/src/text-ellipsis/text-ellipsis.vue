<template>
  <div ref="root" class="ky-text-ellipsis" :class="{ 'is-expanded': expanded }">
    <p
      ref="contentElement"
      class="ky-text-ellipsis__content"
      :class="{ 'is-collapsed': !expanded }"
      :style="contentStyle"
    >
      {{ content }}<span v-if="!expanded && overflowed" aria-hidden="true">{{ dots }}</span>
    </p>
    <button
      v-if="expandable && overflowed"
      type="button"
      class="ky-text-ellipsis__action"
      :aria-expanded="expanded"
      @click="toggle()"
    >
      {{ expanded ? collapseText : expandText }}
    </button>
    <p ref="measureElement" class="ky-text-ellipsis__measure" aria-hidden="true">{{ content }}</p>
  </div>
</template>
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { CSSProperties } from 'vue';
import type { TextEllipsisProps } from './text-ellipsis';
defineOptions({ name: 'KyTextEllipsis' });
const props = withDefaults(defineProps<TextEllipsisProps>(), {
  content: '',
  rows: 3,
  dots: '…',
  expandText: '展开',
  collapseText: '收起',
  expandable: true,
});
const emit = defineEmits<{ change: [expanded: boolean] }>();
const root = ref<HTMLElement | null>(null);
const contentElement = ref<HTMLElement | null>(null);
const measureElement = ref<HTMLElement | null>(null);
const expanded = ref(false);
const overflowed = ref(false);
let observer: ResizeObserver | undefined;
let frame = 0;
const contentStyle = computed<CSSProperties>(() => ({
  WebkitLineClamp: expanded.value ? undefined : Math.max(1, Math.trunc(props.rows) || 1),
}));
function measure() {
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    if (!contentElement.value || !measureElement.value) return;
    const style = getComputedStyle(contentElement.value);
    const fontSize = Number.parseFloat(style.fontSize) || 14;
    const lineHeight = Number.parseFloat(style.lineHeight) || fontSize * 1.5;
    const collapsedHeight = lineHeight * Math.max(1, Math.trunc(props.rows) || 1);
    overflowed.value = measureElement.value.scrollHeight > collapsedHeight + 1;
    if (!overflowed.value) expanded.value = false;
  });
}
function toggle(value = !expanded.value) {
  if (!props.expandable || !overflowed.value || expanded.value === value) return;
  expanded.value = value;
  emit('change', value);
}
function observeSize() {
  if (!root.value || typeof ResizeObserver === 'undefined') return;
  observer = new ResizeObserver(measure);
  observer.observe(root.value);
}
watch(
  () => [props.content, props.rows],
  () => nextTick(measure),
);
onMounted(() => {
  measure();
  observeSize();
});
onBeforeUnmount(() => {
  cancelAnimationFrame(frame);
  observer?.disconnect();
});
defineExpose({ toggle });
</script>
