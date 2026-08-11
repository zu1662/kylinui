<template>
  <KySpace size="large"
    ><KyLoading>加载中...</KyLoading><KyLoading type="spinner" color="#08795a" /><KyLoading
      vertical
      :size="36"
      >提交中</KyLoading
    ></KySpace
  >
</template>
<script setup lang="ts">
import KyLoading from '../index';
import KySpace from '../../space';
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
