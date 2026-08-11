<template>
  <KySpace size="large"
    ><KyBadge :content="8"><span class="demo-target">消息</span></KyBadge
    ><KyBadge :content="120" :max="99"><span class="demo-target">订单</span></KyBadge
    ><KyBadge dot><span class="demo-target">提醒</span></KyBadge></KySpace
  >
</template>
<script setup lang="ts">
import KyBadge from '../index';
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
