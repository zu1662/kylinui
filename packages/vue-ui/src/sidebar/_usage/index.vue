<template>
  <div class="sidebar-usage">
    <KySidebar v-model="active"
      ><KySidebarItem name="overview" title="概览" /><KySidebarItem
        name="messages"
        title="消息"
        :disabled="disableSecond"
        :badge="badge" /><KySidebarItem name="settings" title="设置" :dot="showDot"
    /></KySidebar>
    <div class="sidebar-usage__content">当前栏目：{{ labels[active] }}</div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { KySidebar, KySidebarItem } from '../index';
const props = defineProps<{ configProps: Record<string, unknown> }>();
const active = ref('overview');
const labels: Record<string, string> = { overview: '概览', messages: '消息', settings: '设置' };
const showBadge = computed(() => props.configProps.showBadge !== false);
const disableSecond = computed(() => props.configProps.disableSecond === true);
const showDot = computed(() => props.configProps.showDot !== false);
const badge = computed(() => (showBadge.value ? 8 : undefined));
</script>
<style scoped>
.sidebar-usage {
  display: flex;
  min-height: 260px;
  padding: var(--ky-space-4);
}
.sidebar-usage__content {
  display: grid;
  flex: 1;
  color: var(--ky-color-text-secondary);
  place-items: center;
}
</style>
