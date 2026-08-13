<template>
  <div class="image-preview-usage">
    <button type="button" @click="openPreview">打开图片预览</button>
    <p>支持拖动切换、双击缩放、滚轮缩放与键盘方向键。</p>
  </div>
</template>

<script setup lang="ts">
import { showImagePreview } from '../index';
import { imagePreviewItems } from '../_shared/images';

const props = defineProps<{ configProps: Record<string, unknown> }>();

function openPreview() {
  showImagePreview({ images: imagePreviewItems, ...props.configProps });
}
</script>

<style scoped lang="less">
.image-preview-usage {
  display: grid;
  gap: var(--ky-space-4);
  justify-items: start;
}

.image-preview-usage button {
  min-height: 40px;
  padding: 0 var(--ky-space-5);
  color: var(--ky-color-on-brand);
  cursor: pointer;
  background: var(--ky-color-brand-strong);
  border: 0;
  border-radius: var(--ky-radius-md);
}

.image-preview-usage p {
  margin: 0;
  font-size: var(--ky-font-size-assist);
  color: var(--ky-color-text-secondary);
}
</style>
