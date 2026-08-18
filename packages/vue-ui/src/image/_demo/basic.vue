<template>
  <div class="image-demo">
    <section>
      <h3>结合 ImagePreview 使用</h3>
      <button
        type="button"
        class="image-demo__preview-trigger"
        aria-label="打开图片预览"
        @click="previewVisible = true"
      >
        <KyImage :src="source" alt="山谷插画" width="100%" height="180" radius="16" fit="cover" />
      </button>
      <KyImagePreview v-model="previewVisible" :images="previewImages" />
    </section>
    <section>
      <h3>有限重试与错误状态</h3>
      <KyImage
        src="/missing-image-retry-example.png"
        alt="加载失败示例"
        width="100%"
        height="120"
        :retry="2"
        :retry-delay="200"
        @retry="retryMessage = '正在进行第 ' + $event + ' 次重试'"
      >
        <template #error>图片重试后仍不可用</template>
      </KyImage>
      <p>{{ retryMessage }}</p>
    </section>
    <section ref="scrollRoot" class="image-demo__lazy-root">
      <div class="image-demo__spacer">向下滚动加载图片</div>
      <KyImage
        :src="source"
        :lazy-root="scrollRoot"
        lazy
        alt="自定义观察根节点示例"
        width="100%"
        height="120"
        fit="cover"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KyImagePreview from '../../image-preview';
import { imagePreviewItems } from '../../image-preview/_shared/images';
import KyImage from '../index';

const scrollRoot = ref<HTMLElement | null>(null);
const previewVisible = ref(false);
const retryMessage = ref('失败后最多重试 2 次');
const previewImages = imagePreviewItems.slice(0, 3);
const source = previewImages[0].src;
</script>

<style scoped>
.image-demo {
  display: grid;
  gap: var(--ky-space-5);
  padding: var(--ky-space-4);
  background: var(--ky-color-page-bg);
}

.image-demo h3,
.image-demo p {
  margin: 0 0 var(--ky-space-2);
  color: var(--ky-color-text-secondary);
  font-size: var(--ky-font-size-assist);
}

.image-demo__preview-trigger {
  display: block;
  width: 100%;
  padding: 0;
  overflow: hidden;
  cursor: zoom-in;
  background: transparent;
  border: 0;
  border-radius: var(--ky-radius-lg);
}

.image-demo__preview-trigger:focus-visible {
  outline: 3px solid var(--ky-color-brand-100);
  outline-offset: 2px;
}

.image-demo__lazy-root {
  height: 180px;
  overflow-y: auto;
  border: 1px solid var(--ky-color-divider);
  border-radius: var(--ky-radius-md);
}

.image-demo__spacer {
  display: grid;
  height: 190px;
  place-items: center;
  color: var(--ky-color-text-secondary);
}
</style>
