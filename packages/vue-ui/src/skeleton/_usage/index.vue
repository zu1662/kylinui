<template>
  <div class="skeleton-usage">
    <KySkeleton v-bind="configProps"
      ><article>
        <strong>内容已加载</strong>
        <p>关闭加载状态后展示默认插槽。</p>
      </article></KySkeleton
    >
  </div>
</template>
<script setup lang="ts">
import KySkeleton from '../index';
defineProps<{ configProps: Record<string, unknown> }>();
</script>
<style scoped>
.skeleton-usage {
  padding: 24px 20px;
}
.skeleton-usage p {
  color: var(--ky-color-text-secondary);
}
</style>
