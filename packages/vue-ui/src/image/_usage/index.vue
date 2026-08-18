<template>
  <div class="image-usage">
    <KyImage
      v-bind="configProps"
      :src="source"
      :preview-images="previewImages"
      alt="山谷插画"
      width="100%"
      height="240"
      sizes="(max-width: 480px) 100vw, 480px"
      @retry="status = '第 ' + $event + ' 次重试'"
      @preview="status = '已打开 ' + $event.length + ' 张图片的预览'"
    />
    <p>{{ status }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KyImage from '../index';

defineProps<{ configProps: Record<string, unknown> }>();
const source =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480"><rect width="800" height="480" fill="#e7f4ee"/><path d="M0 350L190 170l150 130L500 90l300 300v90H0z" fill="#7fc8a9"/><circle cx="660" cy="100" r="48" fill="#ffd27d"/></svg>',
  );
const secondSource =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480"><rect width="800" height="480" fill="#edf0fa"/><circle cx="400" cy="240" r="150" fill="#8fa8d9"/></svg>',
  );
const previewImages = [source, { src: secondSource, caption: '第二张预览图' }];
const status = ref('点击图片打开预览');
</script>

<style scoped>
.image-usage {
  display: grid;
  gap: var(--ky-space-3);
  padding: var(--ky-space-4);
}

.image-usage p {
  margin: 0;
  color: var(--ky-color-text-secondary);
  text-align: center;
}
</style>
