<template>
  <div>
    上方内容<KyDivider>分割内容</KyDivider>下方内容<KyDivider dashed content-position="left"
      >虚线</KyDivider
    >
  </div>
</template>
<script setup lang="ts">
import KyDivider from '../index';
</script>
<style scoped>
.demo-target {
  display: inline-grid;
  min-width: 64px;
  height: 40px;
  padding: 0 12px;
  place-items: center;
  background: var(--ky-color-brand-soft);
  border-radius: var(--ky-radius-sm);
}
.ky-demo-stack {
  display: grid;
  gap: 20px;
}
.demo-count b {
  display: inline-grid;
  min-width: 30px;
  height: 30px;
  place-items: center;
  color: #fff;
  background: var(--ky-color-brand-strong);
  border-radius: 6px;
}
</style>
