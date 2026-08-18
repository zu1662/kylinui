<template>
  <div class="sidebar-usage">
    <KySidebar v-model="active" v-bind="configProps">
      <KySidebarItem v-for="item in items" :key="item.name" v-bind="item" />
    </KySidebar>
    <div class="sidebar-usage__content">当前分类：{{ active }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { SidebarItemProps } from '../index';
import { KySidebar, KySidebarItem } from '../index';

defineProps<{ configProps: Record<string, unknown> }>();
const active = ref('recommend');
const items: SidebarItemProps[] = [
  { name: 'recommend', title: '推荐', activeIcon: 'star-fill', inactiveIcon: 'star' },
  { name: 'clothes', title: '服饰', icon: 'user', badge: 5 },
  { name: 'food', title: '食品', icon: 'shop' },
  { name: 'digital', title: '数码', icon: 'phone' },
  { name: 'home', title: '家居', icon: 'home-line' },
  { name: 'travel', title: '旅行', icon: 'location' },
  { name: 'member', title: '会员', icon: 'user', disabled: true },
  { name: 'more', title: '更多', icon: 'more' },
];
</script>

<style scoped>
.sidebar-usage {
  display: flex;
  height: 320px;
  overflow: hidden;
  background: var(--ky-color-page-bg);
}

.sidebar-usage :deep(.ky-sidebar) {
  flex: 0 0 112px;
  overflow-y: auto;
}

.sidebar-usage__content {
  flex: 1;
  padding: var(--ky-space-6) var(--ky-space-4);
  color: var(--ky-color-text-secondary);
  background: var(--ky-color-surface);
}
</style>
