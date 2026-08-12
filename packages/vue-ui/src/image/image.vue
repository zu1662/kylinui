<template>
  <span
    ref="root"
    class="ky-image"
    :class="{ 'ky-image--round': round, 'ky-image--block': block }"
    :style="rootStyle"
  >
    <img
      v-if="shouldRenderImage"
      v-show="loaded && !failed"
      class="ky-image__img"
      :src="src"
      :alt="alt"
      :style="imageStyle"
      :crossorigin="crossorigin"
      :referrerpolicy="referrerpolicy"
      :decoding="decoding"
      @load="handleLoad"
      @error="handleError"
    />
    <span v-if="showLoading && !loaded && !failed" class="ky-image__state" role="status"
      ><slot name="loading">图片加载中</slot></span
    >
    <span
      v-else-if="showError && failed"
      class="ky-image__state ky-image__state--error"
      role="status"
      ><slot name="error">图片加载失败</slot></span
    >
  </span>
</template>
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { CSSProperties } from 'vue';
import type { ImageProps } from './image';
import { resolveImageSize } from './image';
defineOptions({ name: 'KyImage' });
const props = withDefaults(defineProps<ImageProps>(), {
  src: '',
  alt: '',
  fit: 'fill',
  position: 'center',
  width: undefined,
  height: undefined,
  radius: undefined,
  round: false,
  block: false,
  lazy: false,
  showLoading: true,
  showError: true,
  crossorigin: undefined,
  referrerpolicy: undefined,
  decoding: 'async',
});
const emit = defineEmits<{ load: [event: Event]; error: [event: Event] }>();
const root = ref<HTMLElement | null>(null);
const loaded = ref(false);
const failed = ref(!props.src);
const shouldLoad = ref(!props.lazy);
let observer: IntersectionObserver | undefined;
const shouldRenderImage = computed(() => shouldLoad.value && Boolean(props.src));
const rootStyle = computed<CSSProperties>(() => ({
  width: resolveImageSize(props.width),
  height: resolveImageSize(props.height),
  borderRadius: props.round ? undefined : resolveImageSize(props.radius),
}));
const imageStyle = computed<CSSProperties>(() => ({
  objectFit: props.fit,
  objectPosition: props.position,
}));
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
  observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    shouldLoad.value = true;
    observer?.disconnect();
    observer = undefined;
  });
  observer.observe(root.value);
}
function resetState() {
  loaded.value = false;
  failed.value = !props.src;
  shouldLoad.value = !props.lazy;
  nextTick(startObserving);
}
function handleLoad(event: Event) {
  loaded.value = true;
  failed.value = false;
  emit('load', event);
}
function handleError(event: Event) {
  loaded.value = false;
  failed.value = true;
  emit('error', event);
}
watch(() => props.src, resetState);
watch(() => props.lazy, resetState);
onMounted(startObserving);
onBeforeUnmount(() => observer?.disconnect());
</script>
