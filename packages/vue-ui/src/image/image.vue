<template>
  <span
    ref="root"
    class="ky-image"
    :class="{
      'ky-image--round': round,
      'ky-image--block': block,
      'is-previewable': preview && loaded && !failed,
    }"
    :style="rootStyle"
    :role="preview && loaded && !failed ? 'button' : undefined"
    :tabindex="preview && loaded && !failed ? 0 : undefined"
    @click="openPreview"
    @keydown.enter.prevent="openPreview"
    @keydown.space.prevent="openPreview"
  >
    <img
      v-if="shouldRenderImage"
      v-show="loaded && !failed"
      :key="requestId + '-' + renderKey"
      class="ky-image__img"
      :src="src"
      :srcset="srcset"
      :sizes="sizes"
      :alt="alt"
      :style="imageStyle"
      :crossorigin="crossorigin"
      :referrerpolicy="referrerpolicy"
      :decoding="decoding"
      :loading="lazy ? 'lazy' : 'eager'"
      :data-request-id="requestId"
      @load="handleLoad"
      @error="handleError"
    />
    <span v-if="showLoading && !loaded && !failed" class="ky-image__state" role="status">
      <slot name="loading">{{ locale.imageLoadingText }}</slot>
    </span>
    <span
      v-else-if="showError && failed"
      class="ky-image__state ky-image__state--error"
      role="status"
    >
      <slot name="error">{{ locale.imageErrorText }}</slot>
    </span>
  </span>
</template>
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { CSSProperties } from 'vue';
import { useConfigProvider } from '../config-provider';
import { showImagePreview, type ImagePreviewSource } from '../image-preview';
import type { ImageProps } from './image';
import { resolveImageSize } from './image';
defineOptions({ name: 'KyImage' });
const props = withDefaults(defineProps<ImageProps>(), {
  src: '',
  srcset: '',
  sizes: '',
  alt: '',
  fit: 'fill',
  position: 'center',
  width: undefined,
  height: undefined,
  radius: undefined,
  round: false,
  block: false,
  lazy: false,
  lazyRoot: null,
  lazyRootMargin: '0px',
  retry: 0,
  retryDelay: 0,
  preview: false,
  previewImages: () => [],
  previewStartPosition: 0,
  showLoading: true,
  showError: true,
  crossorigin: undefined,
  referrerpolicy: undefined,
  decoding: 'async',
});
const emit = defineEmits<{
  load: [event: Event];
  error: [event: Event];
  retry: [attempt: number, maximum: number];
  preview: [images: ImagePreviewSource[], startPosition: number];
}>();
const { locale } = useConfigProvider();
const root = ref<HTMLElement | null>(null);
const loaded = ref(false);
const failed = ref(!props.src);
const shouldLoad = ref(!props.lazy);
const requestId = ref(0);
const renderKey = ref(0);
const retryAttempt = ref(0);
let observer: IntersectionObserver | undefined;
let retryTimer: ReturnType<typeof setTimeout> | undefined;
let mounted = false;
const shouldRenderImage = computed(() => shouldLoad.value && Boolean(props.src));
const normalizedRetry = computed(() => Math.min(10, Math.max(0, Math.floor(props.retry))));
const rootStyle = computed<CSSProperties>(() => ({
  width: resolveImageSize(props.width),
  height: resolveImageSize(props.height),
  borderRadius: props.round ? undefined : resolveImageSize(props.radius),
}));
const imageStyle = computed<CSSProperties>(() => ({
  objectFit: props.fit,
  objectPosition: props.position,
}));

function resolveObserverRoot() {
  if (typeof Element !== 'undefined' && props.lazyRoot instanceof Element) return props.lazyRoot;
  if (typeof props.lazyRoot !== 'string' || typeof document === 'undefined') return null;
  try {
    return document.querySelector(props.lazyRoot);
  } catch {
    return null;
  }
}

function startObserving() {
  observer?.disconnect();
  observer = undefined;
  if (
    !props.lazy ||
    shouldLoad.value ||
    !root.value ||
    typeof IntersectionObserver === 'undefined'
  ) {
    shouldLoad.value = true;
    return;
  }
  observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      shouldLoad.value = true;
      observer?.disconnect();
      observer = undefined;
    },
    { root: resolveObserverRoot(), rootMargin: props.lazyRootMargin },
  );
  observer.observe(root.value);
}

function clearRetryTimer() {
  if (retryTimer !== undefined) clearTimeout(retryTimer);
  retryTimer = undefined;
}

function resetState() {
  requestId.value += 1;
  renderKey.value = 0;
  retryAttempt.value = 0;
  clearRetryTimer();
  loaded.value = false;
  failed.value = !props.src;
  shouldLoad.value = !props.lazy;
  void nextTick(startObserving);
}

function eventRequestId(event: Event) {
  return Number((event.currentTarget as HTMLImageElement).dataset.requestId);
}

function handleLoad(event: Event) {
  if (eventRequestId(event) !== requestId.value) return;
  clearRetryTimer();
  loaded.value = true;
  failed.value = false;
  emit('load', event);
}

function handleError(event: Event) {
  const currentRequestId = eventRequestId(event);
  if (currentRequestId !== requestId.value) return;
  loaded.value = false;
  emit('error', event);
  if (retryAttempt.value >= normalizedRetry.value) {
    failed.value = true;
    return;
  }
  retryAttempt.value += 1;
  failed.value = false;
  emit('retry', retryAttempt.value, normalizedRetry.value);
  clearRetryTimer();
  retryTimer = setTimeout(
    () => {
      if (!mounted || currentRequestId !== requestId.value) return;
      renderKey.value += 1;
    },
    Math.max(0, props.retryDelay),
  );
}

function openPreview() {
  if (!props.preview || !loaded.value || failed.value || !props.src) return;
  const images = props.previewImages.length ? [...props.previewImages] : [props.src];
  const startPosition = Math.min(
    images.length - 1,
    Math.max(0, Math.floor(props.previewStartPosition)),
  );
  emit('preview', images, startPosition);
  showImagePreview({ images, startPosition });
}

watch(
  () => [props.src, props.srcset, props.lazy, props.lazyRoot, props.lazyRootMargin],
  resetState,
);
onMounted(() => {
  mounted = true;
  startObserving();
});
onBeforeUnmount(() => {
  mounted = false;
  requestId.value += 1;
  observer?.disconnect();
  clearRetryTimer();
});
</script>
