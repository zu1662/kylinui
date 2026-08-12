<template>
  <div ref="scroller" class="back-top-usage">
    <div class="back-top-usage__tip">向下滚动查看按钮</div>
    <div class="back-top-usage__space" />
    <KyBackTop v-bind="configProps" target=".back-top-usage" />
  </div>
</template>
<script setup lang="ts">
import KyBackTop from '../index';
defineProps<{ configProps: Record<string, unknown> }>();
</script>
<style scoped>
.back-top-usage {
  position: relative;
  height: 420px;
  overflow-y: auto;
  background: var(--ky-color-page-bg);
}
.back-top-usage__tip {
  padding: 24px;
  color: var(--ky-color-text-secondary);
  text-align: center;
}
.back-top-usage__space {
  height: 700px;
  background: linear-gradient(var(--ky-color-surface), var(--ky-color-brand-soft));
}
</style>
