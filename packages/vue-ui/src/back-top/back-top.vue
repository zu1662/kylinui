<template>
  <Transition name="ky-back-top-fade"
    ><button
      v-show="visible"
      type="button"
      class="ky-back-top"
      :style="rootStyle"
      aria-label="返回顶部"
      @click="scrollToTop"
    >
      <slot><KyIcon name="chevron-up" :size="20" /></slot></button
  ></Transition>
</template>
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import KyIcon from '../icon';
import type { BackTopProps, BackTopTarget } from './back-top';
defineOptions({ name: 'KyBackTop' });
const props = withDefaults(defineProps<BackTopProps>(), {
  target: undefined,
  right: 24,
  bottom: 40,
  offset: 200,
  duration: 300,
  zIndex: 30,
});
const emit = defineEmits<{ click: [event: MouseEvent] }>();
const visible = ref(false);
let scrollTarget: HTMLElement | Window | null = null;
let frame = 0;
const unit = (value: number | string) => (typeof value === 'number' ? `${value}px` : value);
const rootStyle = computed(() => ({
  right: unit(props.right),
  bottom: unit(props.bottom),
  zIndex: props.zIndex,
}));
function resolveTarget(target?: BackTopTarget) {
  if (!target || target === window) return window;
  if (typeof target === 'string') return document.querySelector<HTMLElement>(target) ?? window;
  return target;
}
function readTop() {
  if (!scrollTarget) return 0;
  return scrollTarget === window ? window.scrollY : (scrollTarget as HTMLElement).scrollTop;
}
function writeTop(value: number) {
  if (scrollTarget === window) window.scrollTo(0, value);
  else if (scrollTarget) (scrollTarget as HTMLElement).scrollTop = value;
}
function refresh() {
  visible.value = readTop() >= Math.max(0, props.offset);
}
function bindTarget() {
  scrollTarget?.removeEventListener('scroll', refresh);
  scrollTarget = resolveTarget(props.target);
  scrollTarget.addEventListener('scroll', refresh, { passive: true });
  refresh();
}
function scrollToTop(event: MouseEvent) {
  emit('click', event);
  cancelAnimationFrame(frame);
  const start = readTop();
  const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 0
    : Math.max(0, props.duration);
  if (!duration || start <= 0) {
    writeTop(0);
    return;
  }
  const startedAt = performance.now();
  const step = (now: number) => {
    const progress = Math.min(1, (now - startedAt) / duration);
    writeTop(start * (1 - progress) ** 3);
    if (progress < 1) frame = requestAnimationFrame(step);
  };
  frame = requestAnimationFrame(step);
}
onMounted(bindTarget);
watch(() => props.target, bindTarget, { flush: 'post' });
onBeforeUnmount(() => {
  cancelAnimationFrame(frame);
  scrollTarget?.removeEventListener('scroll', refresh);
});
</script>
