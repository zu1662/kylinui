<template>
  <div class="skeleton-usage">
    <KySkeleton v-bind="configProps">
      <article>
        <h3>内容加载完成</h3>
        <p>关闭 loading 后展示默认插槽中的真实内容。</p>
      </article>
    </KySkeleton>
  </div>
</template>

<script setup lang="ts">
import KySkeleton from '../index';

defineProps<{ configProps: Record<string, unknown> }>();
</script>

<style scoped>
.skeleton-usage {
  min-height: 280px;
  padding: var(--ky-space-5);
}

.skeleton-usage article {
  padding: var(--ky-space-5);
  background: var(--ky-color-surface);
  border-radius: var(--ky-radius-md);
}

.skeleton-usage h3,
.skeleton-usage p {
  margin: 0 0 var(--ky-space-2);
}
</style>
