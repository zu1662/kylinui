<template>
  <div class="tab-bar-demo">
    <section>
      <h3>固定标签与禁用项</h3>
      <KyTabBar v-model="primary" :data="primaryTabs" safe-area-inset-bottom />
    </section>
    <section>
      <h3>横向滚动与活动图标</h3>
      <KyTabBar v-model="channel" :data="channels" :fixed-count="4" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TabBarItem } from '../index';
import KyTabBar from '../index';

const primary = ref('home');
const channel = ref('recommend');
const primaryTabs: TabBarItem[] = [
  { label: '首页', value: 'home', activeIcon: 'home-fill', inactiveIcon: 'home-line' },
  { label: '消息', value: 'message', icon: 'message', badge: 3 },
  { label: '发布', value: 'publish', icon: 'plus', disabled: true },
  { label: '我的', value: 'profile', icon: 'user' },
];
const channels: TabBarItem[] = ['推荐', '关注', '本地', '旅行', '美食', '摄影', '亲子'].map(
  (label, index) => ({
    label,
    value: ['recommend', 'follow', 'local', 'travel', 'food', 'photo', 'family'][index],
  }),
);
</script>

<style scoped>
.tab-bar-demo {
  display: grid;
  gap: var(--ky-space-6);
  padding: var(--ky-space-4);
  background: var(--ky-color-page-bg);
}

.tab-bar-demo h3 {
  margin: 0 0 var(--ky-space-2);
  color: var(--ky-color-text-secondary);
  font-size: var(--ky-font-size-assist);
}
</style>
