<template>
  <ImagePreview
    v-bind="componentProps"
    :model-value="imagePreviewServiceState.visible"
    @update:model-value="imagePreviewServiceState.visible = $event"
    @change="handleChange"
    @scale="handleScale"
    @close="handleClose"
    @closed="handleClosed"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ImagePreview from './image-preview.vue';
import { imagePreviewServiceState } from './service';

// 服务回调由宿主统一转发，避免同时作为组件监听器透传后被重复调用。
const componentProps = computed(() => {
  const {
    onChange: _onChange,
    onScale: _onScale,
    onClose: _onClose,
    onClosed: _onClosed,
    ...options
  } = imagePreviewServiceState.options;
  return options;
});

function handleChange(index: number) {
  imagePreviewServiceState.options.onChange?.(index);
}

function handleScale(scale: number, index: number) {
  imagePreviewServiceState.options.onScale?.(scale, index);
}

function handleClose(index: number) {
  imagePreviewServiceState.options.onClose?.(index);
}

function handleClosed() {
  imagePreviewServiceState.options.onClosed?.();
}
</script>
