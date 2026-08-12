<template>
  <div ref="root" class="ky-watermark">
    <div class="ky-watermark__content"><slot /></div>
    <div
      class="ky-watermark__layer"
      :class="{ 'is-full-page': fullPage }"
      :style="layerStyle"
      aria-hidden="true"
    />
  </div>
</template>
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { CSSProperties } from 'vue';
import type { WatermarkProps } from './watermark';
import { escapeWatermarkText } from './watermark';
defineOptions({ name: 'KyWatermark' });
const props = withDefaults(defineProps<WatermarkProps>(), {
  content: 'Kylin Design',
  image: '',
  width: 120,
  height: 64,
  gapX: 24,
  gapY: 24,
  rotate: -22,
  opacity: 0.16,
  color: '',
  fontSize: 14,
  zIndex: 1,
  fullPage: false,
});
const root = ref<HTMLElement | null>(null);
const resolvedColor = ref('');
let themeObserver: MutationObserver | undefined;
const lines = computed(() => (Array.isArray(props.content) ? props.content : [props.content]));
const tileWidth = computed(() => Math.max(1, props.width + props.gapX));
const tileHeight = computed(() => Math.max(1, props.height + props.gapY));
const backgroundImage = computed(() => {
  if (!resolvedColor.value && !props.image) return undefined;
  const centerX = tileWidth.value / 2;
  const centerY = tileHeight.value / 2;
  const contentWidth = Math.max(1, props.width);
  const contentHeight = Math.max(1, props.height);
  const body = props.image
    ? `<image href="${escapeWatermarkText(props.image)}" x="${centerX - contentWidth / 2}" y="${centerY - contentHeight / 2}" width="${contentWidth}" height="${contentHeight}" preserveAspectRatio="xMidYMid meet"/>`
    : `<text x="${centerX}" y="${centerY}" fill="${escapeWatermarkText(resolvedColor.value)}" font-size="${Math.max(1, props.fontSize)}" text-anchor="middle" dominant-baseline="middle">${lines.value.map((line, index) => `<tspan x="${centerX}" dy="${index === 0 ? -(lines.value.length - 1) * props.fontSize * 0.6 : props.fontSize * 1.2}">${escapeWatermarkText(line)}</tspan>`).join('')}</text>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${tileWidth.value}" height="${tileHeight.value}" viewBox="0 0 ${tileWidth.value} ${tileHeight.value}"><g opacity="${Math.min(Math.max(props.opacity, 0), 1)}" transform="rotate(${props.rotate} ${centerX} ${centerY})">${body}</g></svg>`;
  return `url("data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}")`;
});
const layerStyle = computed<CSSProperties>(() => ({
  zIndex: props.zIndex,
  backgroundImage: backgroundImage.value,
  backgroundSize: `${tileWidth.value}px ${tileHeight.value}px`,
}));
function syncColor() {
  if (root.value) resolvedColor.value = props.color || getComputedStyle(root.value).color;
}
function observeTheme() {
  if (!root.value || typeof MutationObserver === 'undefined') return;
  themeObserver = new MutationObserver(syncColor);
  let current: HTMLElement | null = root.value;
  while (current) {
    themeObserver.observe(current, {
      attributes: true,
      attributeFilter: ['class', 'style', 'data-ky-theme'],
    });
    current = current.parentElement;
  }
}
watch(
  () => props.color,
  () => nextTick(syncColor),
);

onMounted(() => {
  syncColor();
  observeTheme();
});
onBeforeUnmount(() => themeObserver?.disconnect());
</script>
