<template>
  <section class="ky-swiper" :aria-label="ariaLabel" @mouseenter="pause" @mouseleave="resume">
    <div
      ref="viewport"
      class="ky-swiper__viewport"
      data-no-touch-scroll
      @click.capture="dragGesture.guardClick"
      @pointerdown="dragGesture.startPointer"
      @touchstart.passive="dragGesture.startTouch"
    >
      <div
        ref="track"
        class="ky-swiper__track"
        :class="{ 'is-dragging': dragging }"
        :style="trackStyle"
        @transitionend="handleTrackTransitionEnd"
      >
        <article
          v-for="slide in renderedSlides"
          :key="slide.key"
          class="ky-swiper__slide"
          :style="slideStyle"
          role="group"
          :aria-label="`${slide.index + 1} / ${data.length}`"
          :aria-hidden="slide.cloned || slide.index !== currentIndex"
          :inert="slide.cloned ? true : undefined"
        >
          <slot
            name="item"
            :item="slide.item"
            :index="slide.index"
            :active="!slide.cloned && slide.index === currentIndex"
          >
            <img
              v-if="imageSource(slide.item)"
              :src="imageSource(slide.item)"
              :alt="imageAlt(slide.item, slide.index)"
            />
            <div v-else class="ky-swiper__fallback">
              {{ itemTitle(slide.item, slide.index) }}
            </div>
          </slot>
        </article>
      </div>
    </div>

    <div v-if="showDots && data.length > 1" class="ky-swiper__dots" aria-label="轮播分页">
      <button
        v-for="(_, index) in data"
        :key="index"
        type="button"
        :class="{ 'is-active': index === currentIndex }"
        :aria-label="`切换到第 ${index + 1} 项`"
        :aria-current="index === currentIndex ? 'true' : undefined"
        @click="goTo(index)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { shouldCommitGesture, useAxisDrag, useReducedMotion } from '../shared/use-gesture';
import type { SwiperItem, SwiperProps } from './swiper';

defineOptions({ name: 'KySwiper' });
const props = withDefaults(defineProps<SwiperProps>(), {
  initialIndex: 0,
  data: () => [],
  loop: true,
  autoplay: false,
  interval: 3000,
  duration: 300,
  showDots: true,
  touchable: true,
  scale: 1,
  gap: 0,
  ariaLabel: '轮播图',
});
const emit = defineEmits<{
  'update:modelValue': [index: number];
  change: [index: number];
  dragStart: [];
  dragEnd: [index: number];
}>();

const viewport = ref<HTMLElement | null>(null);
const track = ref<HTMLElement | null>(null);
const viewportWidth = ref(0);
const internalIndex = ref(normalizeIndex(props.modelValue ?? props.initialIndex));
const trackIndex = ref(toTrackIndex(internalIndex.value));
const dragOffset = ref(0);
const dragging = ref(false);
const transitionEnabled = ref(true);
let timer: ReturnType<typeof setInterval> | undefined;
let boundaryResetTimer: ReturnType<typeof setTimeout> | undefined;
let transitionFrame: number | undefined;
let resizeObserver: ResizeObserver | undefined;
let disposed = false;

const reducedMotion = useReducedMotion();
const effectiveDuration = computed(() => (reducedMotion.value ? 0 : Math.max(0, props.duration)));
const currentIndex = computed(() => normalizeIndex(internalIndex.value));
const renderedSlides = computed(() => {
  const slides = props.data.map((item, index) => ({
    item,
    index,
    cloned: false,
    key: `slide-${index}`,
  }));
  if (!isLooping()) return slides;

  const lastIndex = props.data.length - 1;
  return [
    {
      item: props.data[lastIndex],
      index: lastIndex,
      cloned: true,
      key: 'clone-before',
    },
    ...slides,
    {
      item: props.data[0],
      index: 0,
      cloned: true,
      key: 'clone-after',
    },
  ];
});
const slideStyle = computed(() => ({
  width: `${Math.max(0.1, Math.min(1, props.scale)) * 100}%`,
}));
const trackStyle = computed(() => {
  const width = viewportWidth.value || viewport.value?.clientWidth || 1;
  const scale = Math.max(0.1, Math.min(1, props.scale));
  const slideWidth = width * scale;
  const itemWidth = slideWidth + props.gap;
  const centerOffset = (width - slideWidth) / 2;
  return {
    gap: `${props.gap}px`,
    transform: `translate3d(${centerOffset - trackIndex.value * itemWidth + dragOffset.value}px, 0, 0)`,
    transitionDuration:
      dragging.value || !transitionEnabled.value ? '0ms' : `${effectiveDuration.value}ms`,
  };
});

function isLooping() {
  return props.loop && props.data.length > 1;
}

function normalizeIndex(index: number) {
  const length = props.data.length;
  if (!length) return 0;
  if (props.loop) return ((index % length) + length) % length;
  return Math.min(length - 1, Math.max(0, index));
}

function toTrackIndex(index: number) {
  return isLooping() ? index + 1 : index;
}

function clearBoundaryReset() {
  if (boundaryResetTimer) clearTimeout(boundaryResetTimer);
  boundaryResetTimer = undefined;
}

/**
 * 循环切换先移动到首尾克隆项，动画结束后再关闭过渡并跳回对应真实项。
 * 克隆项与真实项内容一致，因此用户看不到轨道位置复位，也不会出现整条轨道倒退。
 */
function correctLoopBoundary() {
  if (!isLooping()) return;
  const length = props.data.length;
  let canonicalIndex: number | undefined;
  if (trackIndex.value === 0) canonicalIndex = length;
  if (trackIndex.value === length + 1) canonicalIndex = 1;
  if (canonicalIndex === undefined) return;

  clearBoundaryReset();
  transitionEnabled.value = false;
  trackIndex.value = canonicalIndex;
  void nextTick(() => {
    if (disposed) return;
    // 强制提交无动画复位，再恢复后续切换动画。
    void track.value?.offsetWidth;
    if (transitionFrame !== undefined) cancelAnimationFrame(transitionFrame);
    transitionFrame = requestAnimationFrame(() => {
      transitionEnabled.value = true;
      transitionFrame = undefined;
    });
  });
}

function scheduleBoundaryCorrection() {
  clearBoundaryReset();
  if (!isLooping()) return;
  const length = props.data.length;
  if (trackIndex.value !== 0 && trackIndex.value !== length + 1) return;
  if (effectiveDuration.value <= 0) {
    void nextTick(correctLoopBoundary);
    return;
  }
  // transitionend 是主路径；定时器用于轨道未触发事件时兜底复位。
  boundaryResetTimer = setTimeout(correctLoopBoundary, effectiveDuration.value + 80);
}

function handleTrackTransitionEnd(event: TransitionEvent) {
  if (event.target !== event.currentTarget || event.propertyName !== 'transform') return;
  correctLoopBoundary();
}

function resolveTargetTrackIndex(current: number, next: number) {
  if (!isLooping()) return next;
  const lastIndex = props.data.length - 1;
  if (current === lastIndex && next === 0) return props.data.length + 1;
  if (current === 0 && next === lastIndex) return 0;
  return next + 1;
}

function setIndex(index: number, shouldEmit = true) {
  const nextIndex = normalizeIndex(index);
  const previousIndex = currentIndex.value;
  if (nextIndex === previousIndex) return;

  clearBoundaryReset();
  transitionEnabled.value = true;
  trackIndex.value = resolveTargetTrackIndex(previousIndex, nextIndex);
  internalIndex.value = nextIndex;
  if (shouldEmit) {
    emit('update:modelValue', nextIndex);
    emit('change', nextIndex);
  }
  scheduleBoundaryCorrection();
}

function goTo(index: number) {
  setIndex(index);
  restart();
}

function next() {
  if (!props.loop && currentIndex.value >= props.data.length - 1) return;
  setIndex(currentIndex.value + 1);
}

function prev() {
  if (!props.loop && currentIndex.value <= 0) return;
  setIndex(currentIndex.value - 1);
}

const dragGesture = useAxisDrag({
  axis: 'x',
  disabled: computed(() => !props.touchable || props.data.length < 2),
  getBounds: () => {
    if (isLooping()) return {};
    return {
      min: currentIndex.value >= props.data.length - 1 ? 0 : undefined,
      max: currentIndex.value <= 0 ? 0 : undefined,
    };
  },
  onStart: () => {
    pause();
    dragging.value = true;
    emit('dragStart');
  },
  onMove: ({ offset }) => {
    dragOffset.value = offset;
  },
  onEnd: ({ rawOffset, velocity }) => {
    const threshold = Math.min(72, (viewport.value?.clientWidth || 320) * 0.2);
    if (shouldCommitGesture(rawOffset, velocity, threshold, 0.45)) {
      const projectedOffset = rawOffset + velocity * 120;
      if (projectedOffset < 0) next();
      else prev();
    }
    dragOffset.value = 0;
    dragging.value = false;
    emit('dragEnd', currentIndex.value);
    resume();
  },
  onCancel: () => {
    dragOffset.value = 0;
    dragging.value = false;
    emit('dragEnd', currentIndex.value);
    resume();
  },
});
// 自动播放间隔下限 500ms：非正数视为禁用自动播放，避免 0 或负数被浏览器当作接近 0ms 的高频空转。
const MIN_AUTOPLAY_INTERVAL = 500;
function autoplayDelay() {
  const raw = typeof props.autoplay === 'number' ? props.autoplay : props.interval;
  return Number.isFinite(raw) && raw > 0 ? Math.max(raw, MIN_AUTOPLAY_INTERVAL) : 0;
}

function resume() {
  pause();
  if (reducedMotion.value || !props.autoplay || props.data.length < 2) return;
  const delay = autoplayDelay();
  if (delay <= 0) return;
  timer = setInterval(next, delay);
}

function pause() {
  if (timer) clearInterval(timer);
  timer = undefined;
}

function restart() {
  pause();
  resume();
}

function imageSource(item: SwiperItem | string) {
  if (typeof item === 'string') return item;
  return item.image ?? item.url ?? '';
}

function imageAlt(item: SwiperItem | string, index: number) {
  return typeof item === 'string'
    ? `轮播图 ${index + 1}`
    : (item.alt ?? item.title ?? `轮播图 ${index + 1}`);
}

function itemTitle(item: SwiperItem | string, index: number) {
  return typeof item === 'string' ? item : (item.title ?? `第 ${index + 1} 项`);
}

watch(
  () => props.modelValue,
  (value) => {
    if (value !== undefined) setIndex(value, false);
  },
);
watch(
  () => [props.loop, props.data.length] as const,
  () => {
    clearBoundaryReset();
    internalIndex.value = normalizeIndex(internalIndex.value);
    transitionEnabled.value = false;
    trackIndex.value = toTrackIndex(internalIndex.value);
    void nextTick(() => {
      transitionEnabled.value = true;
    });
    restart();
  },
);
watch(() => [props.autoplay, props.interval, reducedMotion.value], restart);
onMounted(() => {
  viewportWidth.value = viewport.value?.clientWidth ?? 0;
  if (typeof ResizeObserver !== 'undefined' && viewport.value) {
    resizeObserver = new ResizeObserver(([entry]) => {
      viewportWidth.value = entry?.contentRect.width ?? viewport.value?.clientWidth ?? 0;
    });
    resizeObserver.observe(viewport.value);
  }
  resume();
});
onBeforeUnmount(() => {
  disposed = true;
  resizeObserver?.disconnect();
  pause();
  clearBoundaryReset();
  if (transitionFrame !== undefined) cancelAnimationFrame(transitionFrame);
});

defineExpose({ next, prev, goTo });
</script>
