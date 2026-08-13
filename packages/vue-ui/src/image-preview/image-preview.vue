<template>
  <KyPopup
    :model-value="modelValue"
    position="bottom"
    :close-on-overlay="false"
    :safe-area="false"
    :teleport="teleport"
    :z-index="resolvedZIndex"
    animation="fade"
    panel-class="ky-image-preview-popup"
    aria-label="图片预览"
    @opened="handleOpened"
    @closed="handleClosed"
  >
    <section ref="root" class="ky-image-preview" tabindex="-1" @keydown="handleKeydown">
      <header class="ky-image-preview__header">
        <div v-if="showIndex && normalizedImages.length" class="ky-image-preview__index">
          <slot name="index" :index="currentIndex" :total="normalizedImages.length">
            {{ currentIndex + 1 }} / {{ normalizedImages.length }}
          </slot>
        </div>
        <button
          v-if="closeable"
          type="button"
          class="ky-image-preview__control ky-image-preview__close"
          aria-label="关闭图片预览"
          @click="close"
        >
          <KyIcon name="close" :size="22" />
        </button>
      </header>

      <KySwiper
        ref="swiper"
        v-model="currentIndex"
        class="ky-image-preview__swiper"
        :data="normalizedImages"
        :loop="loop"
        :duration="currentSwipeDuration"
        :show-dots="false"
        :touchable="scale <= normalizedMinZoom"
        aria-label="图片列表"
        @change="handleChange"
      >
        <template #item="{ item, index, active }">
          <div
            class="ky-image-preview__stage"
            @click.self="handleStageClick"
            @pointerdown="handlePointerDown"
            @pointermove="handlePointerMove"
            @pointerup="handlePointerEnd"
            @pointercancel="handlePointerEnd"
            @dblclick.stop="toggleScale"
            @wheel.prevent="handleWheel"
          >
            <div
              v-if="!failedIndexes.has(index)"
              class="ky-image-preview__image-wrap"
              :class="{ 'is-dragging': dragging && active }"
              :style="active ? imageTransformStyle : undefined"
              @click.self="handleStageClick"
            >
              <slot
                name="image"
                :item="item"
                :index="index"
                :active="active"
                :scale="active ? scale : normalizedMinZoom"
              >
                <img
                  class="ky-image-preview__image"
                  :src="imageSource(item)"
                  :alt="imageAlt(item, index)"
                  draggable="false"
                  @click.stop
                  @error="handleImageError(index)"
                />
              </slot>
            </div>
            <div v-else class="ky-image-preview__error" role="status" @click.stop>图片加载失败</div>
          </div>
        </template>
      </KySwiper>

      <button
        v-if="showNavigation"
        type="button"
        class="ky-image-preview__control ky-image-preview__arrow ky-image-preview__arrow--prev"
        aria-label="上一张图片"
        @click="prev"
      >
        <KyIcon name="arrow-left" :size="24" />
      </button>
      <button
        v-if="showNavigation"
        type="button"
        class="ky-image-preview__control ky-image-preview__arrow ky-image-preview__arrow--next"
        aria-label="下一张图片"
        @click="next"
      >
        <KyIcon name="arrow-right" :size="24" />
      </button>

      <div v-if="activeItem?.caption || $slots.footer" class="ky-image-preview__footer">
        <slot name="footer" :item="activeItem" :index="currentIndex">
          {{ activeItem?.caption }}
        </slot>
      </div>
      <div v-if="scale > normalizedMinZoom" class="ky-image-preview__scale">
        {{ Math.round(scale * 100) }}%
      </div>
      <div v-if="!normalizedImages.length" class="ky-image-preview__empty">暂无可预览图片</div>
    </section>
  </KyPopup>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { CSSProperties } from 'vue';
import type { SwiperItem } from '../swiper';
import KyIcon from '../icon';
import KyPopup from '../popup';
import { getGlobalZIndex } from '../shared/global-z-index';
import KySwiper from '../swiper';
import {
  normalizeImagePreviewIndex,
  normalizeImagePreviewItem,
  type ImagePreviewItem,
  type ImagePreviewProps,
} from './image-preview';

defineOptions({ name: 'KyImagePreview' });

const props = withDefaults(defineProps<ImagePreviewProps>(), {
  modelValue: false,
  images: () => [],
  startPosition: 0,
  loop: true,
  showIndex: true,
  showArrows: true,
  closeable: true,
  closeOnClickOverlay: true,
  closeOnEsc: true,
  swipeDuration: 300,
  minZoom: 1,
  maxZoom: 3,
  doubleTapZoom: 2,
  teleport: 'body',
  zIndex: undefined,
});

const resolvedZIndex = computed(() => props.zIndex ?? getGlobalZIndex(1100));
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  change: [index: number, item?: ImagePreviewItem];
  scale: [scale: number, index: number, item?: ImagePreviewItem];
  close: [index: number, item?: ImagePreviewItem];
  closed: [];
}>();

interface SwiperExpose {
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
}

interface Point {
  x: number;
  y: number;
}

const root = ref<HTMLElement | null>(null);
const swiper = ref<SwiperExpose | null>(null);
const failedIndexes = ref(new Set<number>());
const normalizedImages = computed(() => props.images.map(normalizeImagePreviewItem));
const normalizedMinZoom = computed(() => Math.max(1, Number(props.minZoom) || 1));
const normalizedMaxZoom = computed(() =>
  Math.max(normalizedMinZoom.value, Number(props.maxZoom) || normalizedMinZoom.value),
);
const normalizedDoubleTapZoom = computed(() =>
  Math.min(
    normalizedMaxZoom.value,
    Math.max(normalizedMinZoom.value, Number(props.doubleTapZoom) || 2),
  ),
);
const normalizedSwipeDuration = computed(() => Math.max(0, Number(props.swipeDuration) || 0));
const suppressSwipeTransition = ref(false);
const currentSwipeDuration = computed(() =>
  suppressSwipeTransition.value ? 0 : normalizedSwipeDuration.value,
);
const currentIndex = ref(
  normalizeImagePreviewIndex(props.startPosition, normalizedImages.value.length, props.loop),
);
const activeItem = computed(() => normalizedImages.value[currentIndex.value]);
const showNavigation = computed(() => props.showArrows && normalizedImages.value.length > 1);
const scale = ref(normalizedMinZoom.value);
const translateX = ref(0);
const translateY = ref(0);
const dragging = ref(false);
const pointerPoints = new Map<number, Point>();
let gestureStartPoint: Point | undefined;
let gestureStartTranslate: Point = { x: 0, y: 0 };
let pinchStartDistance = 0;
let pinchStartScale = 1;
let previousFocus: HTMLElement | null = null;
let suppressStageClick = false;
let suppressClickTimer: ReturnType<typeof setTimeout> | undefined;

const imageTransformStyle = computed<CSSProperties>(() => ({
  transform: `translate3d(${translateX.value}px, ${translateY.value}px, 0) scale(${scale.value})`,
}));

function imageSource(item: SwiperItem | string) {
  return typeof item === 'string' ? item : String(item.src ?? item.image ?? item.url ?? '');
}

function imageAlt(item: SwiperItem | string, index: number) {
  if (typeof item === 'string') return `预览图片 ${index + 1}`;
  return String(item.alt ?? item.title ?? `预览图片 ${index + 1}`);
}

function distance([first, second]: Point[]) {
  return Math.hypot(second.x - first.x, second.y - first.y);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function clampTranslation() {
  if (scale.value <= normalizedMinZoom.value || !root.value) {
    translateX.value = 0;
    translateY.value = 0;
    return;
  }

  const maxX = (root.value.clientWidth * (scale.value - 1)) / 2;
  const maxY = (root.value.clientHeight * (scale.value - 1)) / 2;
  translateX.value = clamp(translateX.value, -maxX, maxX);
  translateY.value = clamp(translateY.value, -maxY, maxY);
}

function setScale(value: number) {
  scale.value = clamp(value, normalizedMinZoom.value, normalizedMaxZoom.value);
  clampTranslation();
  emit('scale', scale.value, currentIndex.value, activeItem.value);
}

function resetScale() {
  scale.value = normalizedMinZoom.value;
  translateX.value = 0;
  translateY.value = 0;
  dragging.value = false;
  pointerPoints.clear();
}

function toggleScale() {
  setScale(
    scale.value > normalizedMinZoom.value ? normalizedMinZoom.value : normalizedDoubleTapZoom.value,
  );
}

function handleWheel(event: WheelEvent) {
  const step = event.deltaY < 0 ? 0.25 : -0.25;
  setScale(scale.value + step);
}

function handlePointerDown(event: PointerEvent) {
  const ownsPointer = event.pointerType === 'touch' || scale.value > normalizedMinZoom.value;
  if (!ownsPointer) return;

  event.stopPropagation();
  (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
  pointerPoints.set(event.pointerId, { x: event.clientX, y: event.clientY });
  dragging.value = true;

  if (pointerPoints.size === 1) {
    gestureStartPoint = { x: event.clientX, y: event.clientY };
    gestureStartTranslate = { x: translateX.value, y: translateY.value };
  } else if (pointerPoints.size === 2) {
    pinchStartDistance = distance(Array.from(pointerPoints.values()));
    pinchStartScale = scale.value;
  }
}

function handlePointerMove(event: PointerEvent) {
  if (!pointerPoints.has(event.pointerId)) return;
  event.preventDefault();
  pointerPoints.set(event.pointerId, { x: event.clientX, y: event.clientY });

  if (pointerPoints.size >= 2) {
    suppressStageClick = true;
    const currentDistance = distance(Array.from(pointerPoints.values()).slice(0, 2));
    if (pinchStartDistance > 0) setScale((currentDistance / pinchStartDistance) * pinchStartScale);
    return;
  }

  if (!gestureStartPoint) return;
  if (Math.hypot(event.clientX - gestureStartPoint.x, event.clientY - gestureStartPoint.y) > 6) {
    suppressStageClick = true;
  }
  if (scale.value <= normalizedMinZoom.value) return;
  translateX.value = gestureStartTranslate.x + event.clientX - gestureStartPoint.x;
  translateY.value = gestureStartTranslate.y + event.clientY - gestureStartPoint.y;
}

function handlePointerEnd(event: PointerEvent) {
  const point = pointerPoints.get(event.pointerId);
  if (!point) return;

  const wasSinglePointer = pointerPoints.size === 1;
  const startPoint = gestureStartPoint;
  pointerPoints.delete(event.pointerId);
  (event.currentTarget as HTMLElement).releasePointerCapture?.(event.pointerId);

  if (
    wasSinglePointer &&
    event.pointerType === 'touch' &&
    scale.value <= normalizedMinZoom.value &&
    startPoint
  ) {
    const deltaX = point.x - startPoint.x;
    const deltaY = point.y - startPoint.y;
    if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) next();
      else prev();
    }
  }

  if (pointerPoints.size === 1) {
    const remaining = Array.from(pointerPoints.values())[0];
    gestureStartPoint = remaining;
    gestureStartTranslate = { x: translateX.value, y: translateY.value };
  } else if (!pointerPoints.size) {
    dragging.value = false;
    gestureStartPoint = undefined;
    pinchStartDistance = 0;
    clampTranslation();
  }

  if (suppressStageClick) {
    if (suppressClickTimer) clearTimeout(suppressClickTimer);
    suppressClickTimer = setTimeout(() => {
      suppressStageClick = false;
      suppressClickTimer = undefined;
    });
  }
}

function handleImageError(index: number) {
  const next = new Set(failedIndexes.value);
  next.add(index);
  failedIndexes.value = next;
}

function handleChange(index: number) {
  resetScale();
  emit('change', index, normalizedImages.value[index]);
}

function handleStageClick() {
  if (suppressStageClick) return;
  if (props.closeOnClickOverlay) close();
}

function close() {
  emit('update:modelValue', false);
  emit('close', currentIndex.value, activeItem.value);
}

function next() {
  swiper.value?.next();
}

function prev() {
  swiper.value?.prev();
}

function swipeTo(index: number) {
  swiper.value?.goTo(index);
}

function handleKeydown(event: KeyboardEvent) {
  if (!props.modelValue || event.defaultPrevented) return;
  if (event.key === 'Escape' && props.closeOnEsc) {
    event.preventDefault();
    close();
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault();
    prev();
  } else if (event.key === 'ArrowRight') {
    event.preventDefault();
    next();
  }
}

async function handleOpened() {
  await nextTick();
  suppressSwipeTransition.value = false;
  root.value?.focus();
}

function handleClosed() {
  resetScale();
  previousFocus?.focus();
  previousFocus = null;
  emit('closed');
}

watch(
  () => props.modelValue,
  (visible) => {
    if (!visible) {
      suppressSwipeTransition.value = false;
      return;
    }

    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    // 打开阶段用零时长同步起始索引，弹层完成进入后再恢复正常切换动画。
    suppressSwipeTransition.value = true;
    currentIndex.value = normalizeImagePreviewIndex(
      props.startPosition,
      normalizedImages.value.length,
      props.loop,
    );
    resetScale();
  },
);

watch(
  () => [props.startPosition, normalizedImages.value.length, props.loop] as const,
  ([position, length, loop]) => {
    const nextIndex = normalizeImagePreviewIndex(position, length, loop);
    if (!props.modelValue) currentIndex.value = nextIndex;
    else if (currentIndex.value >= length) currentIndex.value = nextIndex;
    failedIndexes.value = new Set();
  },
);

watch(normalizedMinZoom, resetScale);
onMounted(() => document.addEventListener('keydown', handleKeydown));
onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown);
  pointerPoints.clear();
  if (suppressClickTimer) clearTimeout(suppressClickTimer);
});

defineExpose({ close, next, prev, swipeTo, resetScale });
</script>
