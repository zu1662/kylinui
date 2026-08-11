<template>
  <KySpace wrap size="medium"
    ><KyButton v-for="item in 6" :key="item" size="small" variant="secondary"
      >选项 {{ item }}</KyButton
    ></KySpace
  >
</template>
<script setup lang="ts">
import KySpace from '../index';
import KyButton from '../../button';
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
