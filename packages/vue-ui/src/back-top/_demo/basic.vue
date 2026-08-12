<template>
  <div ref="scroller" class="back-top-demo">
    <p>滚动此区域</p>
    <div class="back-top-demo__space" />
    <KyBackTop target=".back-top-demo" :offset="100" :right="18" :bottom="18" />
  </div>
</template>
<script setup lang="ts">
import KyBackTop from '../index';
</script>
<style scoped>
.back-top-demo {
  position: relative;
  height: 420px;
  overflow: auto;
  background: var(--ky-color-page-bg);
}
.back-top-demo p {
  padding: 20px;
  text-align: center;
}
.back-top-demo__space {
  height: 760px;
  background: linear-gradient(var(--ky-color-surface), var(--ky-color-brand-mist));
}
</style>
