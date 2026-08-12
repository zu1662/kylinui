<template>
  <div
    ref="root"
    class="ky-list"
    :class="[`ky-list--${direction}`, { 'is-disabled': disabled }]"
    :aria-busy="loading"
  >
    <template v-if="direction === 'up'">
      <ListStatus />
      <div ref="sentinel" class="ky-list__sentinel" aria-hidden="true" />
    </template>

    <slot />

    <template v-if="direction === 'down'">
      <div ref="sentinel" class="ky-list__sentinel" aria-hidden="true" />
      <ListStatus />
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  defineComponent,
  h,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useSlots,
  watch,
} from 'vue';
import KyLoading from '../loading';
import type { ListProps } from './list';

defineOptions({ name: 'KyList' });
const props = withDefaults(defineProps<ListProps>(), {
  loading: false,
  finished: false,
  error: false,
  finishedText: '',
  loadingText: '加载中…',
  errorText: '加载失败，点击重试',
  immediateCheck: true,
  offset: 100,
  direction: 'down',
  disabled: false,
});
const emit = defineEmits<{
  'update:loading': [value: boolean];
  'update:error': [value: boolean];
  load: [];
}>();
const slots = useSlots();
const root = ref<HTMLElement | null>(null);
const sentinel = ref<HTMLElement | null>(null);
const normalizedOffset = computed(() => Math.max(0, Number(props.offset) || 0));

let observer: IntersectionObserver | null = null;
let resizeObserver: ResizeObserver | null = null;
let scrollTarget: HTMLElement | Window | null = null;
let frame = 0;
let requested = false;
let observedLoading = false;

const ListStatus = defineComponent({
  name: 'KyListStatus',
  setup() {
    return () => {
      if (props.loading) {
        return h(
          'div',
          { class: 'ky-list__status ky-list__loading', role: 'status', 'aria-live': 'polite' },
          slots.loading?.() ?? [h(KyLoading, { size: 18 }, () => props.loadingText)],
        );
      }
      if (props.error) {
        return h(
          'div',
          { class: 'ky-list__status ky-list__error', role: 'alert' },
          slots.error?.() ?? [
            h(
              'button',
              { class: 'ky-list__retry', type: 'button', onClick: retry },
              props.errorText,
            ),
          ],
        );
      }
      if (props.finished) {
        return h(
          'div',
          { class: 'ky-list__status ky-list__finished' },
          slots.finished?.() ?? props.finishedText,
        );
      }
      return null;
    };
  },
});

function findScrollTarget(element: HTMLElement) {
  let current = element.parentElement;
  while (current) {
    const style = window.getComputedStyle(current);
    if (/(auto|scroll|overlay)/.test(style.overflowY)) return current;
    current = current.parentElement;
  }
  return window;
}

function isSentinelNearViewport() {
  const element = sentinel.value;
  if (!element || typeof window === 'undefined') return false;
  const rect = element.getBoundingClientRect();
  const bounds =
    scrollTarget instanceof HTMLElement
      ? scrollTarget.getBoundingClientRect()
      : { top: 0, bottom: window.innerHeight };
  return (
    rect.bottom >= bounds.top - normalizedOffset.value &&
    rect.top <= bounds.bottom + normalizedOffset.value
  );
}

function triggerLoad() {
  if (
    requested ||
    props.loading ||
    props.finished ||
    props.error ||
    props.disabled ||
    !isSentinelNearViewport()
  ) {
    return;
  }

  // 先锁定本轮请求，再通知父级更新 loading，避免同一帧内多个观察回调重复触发。
  requested = true;
  observedLoading = false;
  emit('update:loading', true);
  emit('load');
}

function scheduleCheck() {
  if (typeof window === 'undefined') return;
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(triggerLoad);
}

async function retry() {
  if (props.disabled || props.loading) return;
  emit('update:error', false);
  requested = false;
  await nextTick();
  scheduleCheck();
}

function clearObservers() {
  observer?.disconnect();
  observer = null;
  resizeObserver?.disconnect();
  resizeObserver = null;
  if (scrollTarget) scrollTarget.removeEventListener('scroll', scheduleCheck);
  window.removeEventListener('resize', scheduleCheck);
  scrollTarget = null;
}

function bindObservers() {
  if (!root.value || !sentinel.value || typeof window === 'undefined') return;
  clearObservers();
  scrollTarget = findScrollTarget(root.value);

  if (typeof IntersectionObserver !== 'undefined') {
    const margin =
      props.direction === 'up'
        ? `${normalizedOffset.value}px 0px 0px`
        : `0px 0px ${normalizedOffset.value}px`;
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) triggerLoad();
      },
      {
        root: scrollTarget instanceof HTMLElement ? scrollTarget : null,
        rootMargin: margin,
      },
    );
    observer.observe(sentinel.value);
  } else {
    // 老环境通过滚动与尺寸事件回退检查，保证核心加载能力不依赖观察器。
    scrollTarget.addEventListener('scroll', scheduleCheck, { passive: true });
    window.addEventListener('resize', scheduleCheck, { passive: true });
  }

  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(scheduleCheck);
    resizeObserver.observe(root.value);
  }

  if (props.immediateCheck) scheduleCheck();
}

watch(
  () => props.loading,
  (value) => {
    if (value) {
      observedLoading = true;
      return;
    }
    if (observedLoading) {
      observedLoading = false;
      requested = false;
      void nextTick(scheduleCheck);
    }
  },
);
watch(
  () => [
    props.finished,
    props.error,
    props.disabled,
    props.direction,
    normalizedOffset.value,
    props.immediateCheck,
  ],
  () => void nextTick(bindObservers),
  { flush: 'post' },
);
watch(sentinel, () => void nextTick(bindObservers), { flush: 'post' });

onMounted(() => void nextTick(bindObservers));
onBeforeUnmount(() => {
  cancelAnimationFrame(frame);
  clearObservers();
});
</script>
