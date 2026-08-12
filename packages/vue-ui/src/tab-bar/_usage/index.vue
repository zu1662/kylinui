<template>
  <div class="tab-bar-usage">
    <KyTabBar v-model="current" :data="tabs" v-bind="configProps" />
    <div class="tab-bar-usage__content">当前频道：{{ currentLabel }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import KyTabBar from '../index';

defineProps<{ configProps: Record<string, unknown> }>();
const current = ref('home');
const tabs = [
  { label: '首页', value: 'home', icon: 'home-line' },
  { label: '消息', value: 'message', icon: 'notice-line', badge: 2 },
  { label: '日历', value: 'calendar', icon: 'calendar-line', disabled: true },
  { label: '订单', value: 'order', icon: 'order-line' },
  { label: '我的', value: 'profile', icon: 'mine-line' },
];
const currentLabel = computed(() => tabs.find((item) => item.value === current.value)?.label);
</script>

<style scoped lang="less">
.tab-bar-usage {
  width: 100%;
  min-width: 0;
  overflow: hidden;
}

.tab-bar-usage__content {
  min-height: 180px;
  padding: 32px 16px;
  color: var(--ky-color-text-secondary);
  text-align: center;
  background: var(--ky-color-surface);
}
</style>
