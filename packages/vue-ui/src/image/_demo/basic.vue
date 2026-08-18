<template>
  <div class="image-demo">
    <section>
      <h3>预览联动</h3>
      <KyImage
        :src="source"
        :preview-images="previewImages"
        alt="山谷插画"
        width="100%"
        height="180"
        radius="16"
        fit="cover"
        preview
      />
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
import KyImage from '../index';

const scrollRoot = ref<HTMLElement | null>(null);
const retryMessage = ref('失败后最多重试 2 次');
const source =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><rect width="600" height="400" fill="#edf7f2"/><path d="M0 330L150 150l120 120L400 80l200 270v50H0z" fill="#78bfa0"/><circle cx="500" cy="80" r="38" fill="#ffd27d"/></svg>',
  );
const previewImages = [source, { src: source, caption: '同一图片也可作为预览数据项' }];
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
