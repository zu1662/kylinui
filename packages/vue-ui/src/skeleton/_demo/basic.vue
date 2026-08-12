<template>
  <div class="skeleton-demo">
    <KySkeleton title avatar :row="3" /><KySkeleton
      round
      :row="2"
      :row-width="['100%', '45%']"
    /><KySkeleton :loading="false"><div class="skeleton-demo__loaded">加载完成</div></KySkeleton>
  </div>
</template>
<script setup lang="ts">
import KySkeleton from '../index';
</script>
<style scoped>
.skeleton-demo {
  display: grid;
  gap: 28px;
  padding: 24px 16px;
}
.skeleton-demo__loaded {
  padding: 20px;
  background: var(--ky-color-brand-soft);
  border-radius: var(--ky-radius-md);
}
</style>
