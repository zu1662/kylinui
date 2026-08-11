<template>
  <KyEmpty image="search" description="没有找到匹配结果"
    ><KyButton size="small" variant="secondary">清除筛选</KyButton></KyEmpty
  >
</template>
<script setup lang="ts">
import KyEmpty from '../index';
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
  color: #fff;
  background: var(--ky-color-brand-strong);
  border-radius: 6px;
}
</style>
