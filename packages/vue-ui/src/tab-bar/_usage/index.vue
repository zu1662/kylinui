<template>
  <div class="tab-bar-usage">
    <KyTabBar v-model="current" :data="tabs" v-bind="configProps">
      <template #badge="{ badge }">
        <span v-if="badge !== undefined" class="tab-bar-usage__badge">{{ badge }}</span>
      </template>
    </KyTabBar>
    <div class="tab-bar-usage__content">当前频道：{{ currentLabel }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { TabBarItem } from '../index';
import KyTabBar from '../index';

defineProps<{ configProps: Record<string, unknown> }>();
const current = ref('home');
const tabs: TabBarItem[] = [
  { label: '首页', value: 'home', activeIcon: 'home-fill', inactiveIcon: 'home-line' },
  { label: '消息', value: 'message', icon: 'message', badge: 8 },
  { label: '收藏', value: 'favorite', icon: 'star', badge: 'NEW' },
  { label: '订单', value: 'order', icon: 'list' },
  { label: '会员', value: 'member', icon: 'user', disabled: true },
  { label: '设置', value: 'setting', icon: 'setting' },
];
const currentLabel = computed(
  () => tabs.find((item) => item.value === current.value)?.label ?? current.value,
);
</script>

<style scoped>
.tab-bar-usage {
  min-height: 250px;
  padding: var(--ky-space-4);
  background: var(--ky-color-page-bg);
}

.tab-bar-usage__content {
  min-height: 150px;
  padding: var(--ky-space-6) var(--ky-space-4);
  color: var(--ky-color-text-secondary);
  text-align: center;
  background: var(--ky-color-surface);
}

.tab-bar-usage__badge {
  min-width: 18px;
  padding: 0 var(--ky-space-1);
  color: var(--ky-color-on-brand);
  font-size: var(--ky-font-size-caption);
  line-height: 18px;
  text-align: center;
  background: var(--ky-color-danger);
  border-radius: var(--ky-radius-pill);
}
</style>
