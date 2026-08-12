<template>
  <div class="sticky-demo">
    <div class="sticky-demo__lead">滚动容器</div>
    <KySticky :offset="8"><div class="sticky-demo__bar">筛选条件</div></KySticky>
    <div class="sticky-demo__space" />
  </div>
</template>
<script setup lang="ts">
import KySticky from '../index';
</script>
<style scoped>
.sticky-demo {
  height: 420px;
  overflow: auto;
  background: var(--ky-color-page-bg);
}
.sticky-demo__lead {
  height: 120px;
  padding: 24px;
  color: var(--ky-color-text-secondary);
}
.sticky-demo__bar {
  padding: 14px 18px;
  background: var(--ky-color-surface);
}
.sticky-demo__space {
  height: 640px;
}
</style>
