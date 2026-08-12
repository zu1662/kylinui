<template>
  <div class="sidebar-demo">
    <KySidebar v-model="active"
      ><KySidebarItem title="推荐" /><KySidebarItem title="近期" badge="6" /><KySidebarItem
        title="收藏"
        dot /><KySidebarItem title="不可用" disabled
    /></KySidebar>
    <section class="sidebar-demo__panel">当前选中第 {{ Number(active) + 1 }} 项</section>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { KySidebar, KySidebarItem } from '../index';
const active = ref(0);
</script>
<style scoped>
.sidebar-demo {
  display: flex;
  min-height: 260px;
  padding: var(--ky-space-4);
}
.sidebar-demo__panel {
  display: grid;
  flex: 1;
  color: var(--ky-color-text-secondary);
  place-items: center;
}
</style>
