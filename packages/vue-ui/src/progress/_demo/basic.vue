<template>
  <div class="ky-demo-stack">
    <KyProgress :percentage="32" /><KyProgress :percentage="68" color="var(--ky-color-brand-strong)" /><KyProgress
      :percentage="100"
      :show-pivot="false"
    />
  </div>
</template>
<script setup lang="ts">
import KyProgress from '../index';
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
  color: var(--ky-color-on-brand);
  background: var(--ky-color-brand-strong);
  border-radius: 6px;
}
</style>
