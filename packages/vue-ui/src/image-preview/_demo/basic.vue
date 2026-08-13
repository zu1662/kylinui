<template>
  <div class="image-preview-demo">
    <button type="button" @click="visible = true">组件式调用</button>
    <button type="button" @click="openServicePreview">服务式调用</button>

    <div class="image-preview-demo__grid">
      <button
        v-for="(item, index) in imagePreviewItems"
        :key="item.src"
        type="button"
        class="image-preview-demo__thumb"
        :aria-label="`从第 ${index + 1} 张开始预览`"
        @click="openAt(index)"
      >
        <img :src="item.src" :alt="item.alt" />
      </button>
    </div>

    <KyImagePreview
      v-model="visible"
      :images="imagePreviewItems"
      :start-position="startPosition"
      @change="current = $event"
      @close="lastAction = `关闭于第 ${$event + 1} 张`"
    />
    <p aria-live="polite">当前第 {{ current + 1 }} 张；{{ lastAction }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KyImagePreview, { showImagePreview } from '../index';
import { imagePreviewItems } from '../_shared/images';

const visible = ref(false);
const startPosition = ref(0);
const current = ref(0);
const lastAction = ref('等待操作');

function openAt(index: number) {
  startPosition.value = index;
  current.value = index;
  visible.value = true;
}

function openServicePreview() {
  showImagePreview({
    images: imagePreviewItems,
    startPosition: 1,
    onChange: (index) => {
      current.value = index;
    },
    onClose: (index) => {
      lastAction.value = `服务式预览关闭于第 ${index + 1} 张`;
    },
  });
}
</script>

<style scoped lang="less">
.image-preview-demo {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, max-content));
  gap: var(--ky-space-4);
  align-items: start;
}

.image-preview-demo > button {
  min-height: 38px;
  padding: 0 var(--ky-space-4);
  color: var(--ky-color-brand-strong);
  cursor: pointer;
  background: var(--ky-color-brand-soft);
  border: 0;
  border-radius: var(--ky-radius-md);
}

.image-preview-demo__grid {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--ky-space-3);
}

.image-preview-demo__thumb {
  padding: 0;
  overflow: hidden;
  cursor: zoom-in;
  background: var(--ky-color-subtle-bg);
  border: 0;
  border-radius: var(--ky-radius-lg);
  aspect-ratio: 3 / 4;
}

.image-preview-demo__thumb img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-preview-demo p {
  grid-column: 1 / -1;
  margin: 0;
  font-size: var(--ky-font-size-assist);
  color: var(--ky-color-text-secondary);
}
</style>
