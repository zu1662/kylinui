<template>
  <div class="sidebar-demo">
    <KySidebar v-model="active">
      <KySidebarItem name="all" title="全部" active-icon="star-fill" inactive-icon="star" />
      <KySidebarItem name="message" title="消息" icon="message" :badge="12" />
      <KySidebarItem name="local" title="本地" icon="location" dot />
      <KySidebarItem name="disabled" title="暂不可用" disabled />
      <KySidebarItem name="help" title="帮助" href="#sidebar-help" icon="question" />
    </KySidebar>
    <div class="sidebar-demo__panel">{{ active }} 内容区</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { KySidebar, KySidebarItem } from '../index';

const active = ref('all');
</script>

<style scoped>
.sidebar-demo {
  display: flex;
  min-height: 280px;
  background: var(--ky-color-page-bg);
}

.sidebar-demo__panel {
  flex: 1;
  padding: var(--ky-space-6) var(--ky-space-4);
  color: var(--ky-color-text-secondary);
  background: var(--ky-color-surface);
}
</style>
