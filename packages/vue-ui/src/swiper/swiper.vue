<template>
  <section class="ky-swiper" :aria-label="ariaLabel" @mouseenter="pause" @mouseleave="resume">
    <div
      ref="viewport"
      class="ky-swiper__viewport"
      data-no-touch-scroll
      @pointerdown="startPointerDrag"
      @touchstart.passive="startSyntheticTouchDrag"
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
const internalIndex = ref(normalizeIndex(props.modelValue ?? props.initialIndex));
const trackIndex = ref(toTrackIndex(internalIndex.value));
const dragOffset = ref(0);
const dragging = ref(false);
const transitionEnabled = ref(true);
let timer: ReturnType<typeof setInterval> | undefined;
let boundaryResetTimer: ReturnType<typeof setTimeout> | undefined;
let transitionFrame: number | undefined;
let stopDragListeners: (() => void) | undefined;
let dragSessionId = 0;
let disposed = false;

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
  const width = viewport.value?.clientWidth || 1;
  const itemWidth = width * Math.max(0.1, Math.min(1, props.scale)) + props.gap;
  return {
    gap: `${props.gap}px`,
    transform: `translate3d(${-trackIndex.value * itemWidth + dragOffset.value}px, 0, 0)`,
    transitionDuration: dragging.value || !transitionEnabled.value ? '0ms' : `${props.duration}ms`,
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
  if (props.duration <= 0) {
    void nextTick(correctLoopBoundary);
    return;
  }
  // transitionend 是主路径；定时器用于轨道未触发事件时兜底复位。
  boundaryResetTimer = setTimeout(correctLoopBoundary, props.duration + 80);
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

function stopActiveDrag() {
  stopDragListeners?.();
  stopDragListeners = undefined;
}

/**
 * 创建一次带方向锁定的拖拽会话。
 * 纵向移动不会更新轮播偏移，保证页面滚动不会被横向轮播抢占。
 */
function createDragSession(startX: number, startY: number) {
  stopActiveDrag();
  const sessionId = ++dragSessionId;
  const wasDragging = dragging.value;
  let axisLocked = false;
  let horizontal = false;

  pause();
  dragging.value = true;
  if (!wasDragging) emit('dragStart');

  function move(clientX: number, clientY: number, preventDefault: () => void) {
    if (sessionId !== dragSessionId) return;
    const deltaX = clientX - startX;
    const deltaY = clientY - startY;
    if (!axisLocked && Math.hypot(deltaX, deltaY) > 6) {
      axisLocked = true;
      horizontal = Math.abs(deltaX) > Math.abs(deltaY);
    }
    if (!horizontal) return;
    preventDefault();
    dragOffset.value = deltaX;
  }

  function finish(cancelled = false) {
    if (sessionId !== dragSessionId) return;
    const threshold = Math.min(72, (viewport.value?.clientWidth || 320) * 0.2);
    if (!cancelled && horizontal) {
      if (dragOffset.value < -threshold) next();
      if (dragOffset.value > threshold) prev();
    }
    stopActiveDrag();
    dragOffset.value = 0;
    dragging.value = false;
    emit('dragEnd', currentIndex.value);
    resume();
  }

  return { sessionId, move, finish };
}

function startPointerDrag(event: PointerEvent) {
  if (!props.touchable || props.data.length < 2) return;
  const pointerId = event.pointerId;
  const target = event.currentTarget as HTMLElement;
  const session = createDragSession(event.clientX, event.clientY);
  target.setPointerCapture?.(pointerId);

  function move(moveEvent: PointerEvent) {
    if (moveEvent.pointerId !== pointerId) return;
    session.move(moveEvent.clientX, moveEvent.clientY, () => moveEvent.preventDefault());
  }

  function end(endEvent: PointerEvent) {
    if (endEvent.pointerId !== pointerId) return;
    target.releasePointerCapture?.(pointerId);
    session.finish();
  }

  function cancel(cancelEvent: PointerEvent) {
    if (cancelEvent.pointerId !== pointerId) return;
    target.releasePointerCapture?.(pointerId);
    session.finish(true);
  }

  window.addEventListener('pointermove', move);
  window.addEventListener('pointerup', end);
  window.addEventListener('pointercancel', cancel);
  stopDragListeners = () => {
    window.removeEventListener('pointermove', move);
    window.removeEventListener('pointerup', end);
    window.removeEventListener('pointercancel', cancel);
  };
}

// 仅接管文档站触摸模拟器派发的非可信事件，真实触屏继续由 PointerEvent 处理。
function startSyntheticTouchDrag(event: TouchEvent) {
  if (event.isTrusted || !props.touchable || props.data.length < 2 || event.touches.length !== 1) {
    return;
  }
  const touch = event.touches.item(0);
  if (!touch) return;
  const identifier = touch.identifier;
  const session = createDragSession(touch.clientX, touch.clientY);

  function move(moveEvent: TouchEvent) {
    if (moveEvent.isTrusted) return;
    const currentTouch = Array.from(moveEvent.touches).find(
      (item) => item.identifier === identifier,
    );
    if (!currentTouch) return;
    session.move(currentTouch.clientX, currentTouch.clientY, () => moveEvent.preventDefault());
  }

  function end(endEvent: TouchEvent) {
    if (endEvent.isTrusted) return;
    const changedTouch = Array.from(endEvent.changedTouches).find(
      (item) => item.identifier === identifier,
    );
    if (changedTouch) session.finish();
  }

  function cancel(cancelEvent: TouchEvent) {
    if (!cancelEvent.isTrusted) session.finish(true);
  }

  window.addEventListener('touchmove', move, { passive: false });
  window.addEventListener('touchend', end);
  window.addEventListener('touchcancel', cancel);
  stopDragListeners = () => {
    window.removeEventListener('touchmove', move);
    window.removeEventListener('touchend', end);
    window.removeEventListener('touchcancel', cancel);
  };
}

function autoplayDelay() {
  return typeof props.autoplay === 'number' ? props.autoplay : props.interval;
}

function resume() {
  pause();
  if (!props.autoplay || props.data.length < 2) return;
  timer = setInterval(next, autoplayDelay());
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
watch(() => [props.autoplay, props.interval], restart);
onMounted(resume);
onBeforeUnmount(() => {
  disposed = true;
  stopActiveDrag();
  pause();
  clearBoundaryReset();
  if (transitionFrame !== undefined) cancelAnimationFrame(transitionFrame);
});

defineExpose({ next, prev, goTo });
</script>
