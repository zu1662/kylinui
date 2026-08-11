<template>
  <KyGrid :column-num="4" clickable
    ><KyGridItem icon="home" text="首页" /><KyGridItem
      icon="calendar"
      text="日程"
      badge="3" /><KyGridItem icon="bell" text="消息" dot /><KyGridItem icon="setting" text="设置"
  /></KyGrid>
</template>
<script setup lang="ts">
import { KyGrid, KyGridItem } from '../index';
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
