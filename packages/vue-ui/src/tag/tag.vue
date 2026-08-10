<template>
  <span
    class="ky-tag"
    :class="[`ky-tag--${tone}`, `ky-tag--${variant}`, { 'is-round': round }]"
    role="status"
  >
    <slot />
    <button
      v-if="closable"
      class="ky-tag__close"
      type="button"
      aria-label="关闭标签"
      @click="$emit('close')"
    >
      <KyIcon source="iconfont" name="close" :size="12" />
    </button>
  </span>
</template>

<script setup lang="ts">
import KyIcon from '../icon';
import type { TagProps } from './tag';

defineOptions({ name: 'KyTag' });
// 标签只表达轻量状态，关闭行为由使用方决定是否真正移除数据。
withDefaults(defineProps<TagProps>(), { tone: 'brand', variant: 'soft' });
defineEmits<{ close: [] }>();
</script>
