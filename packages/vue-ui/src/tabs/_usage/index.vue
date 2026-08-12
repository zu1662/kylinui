<template>
  <KyTabs v-model="active" v-bind="configProps"
    ><KyTab name="overview" title="概览">概览内容与核心数据。</KyTab
    ><KyTab name="detail" title="详细信息" badge="3">详细信息与更新记录。</KyTab
    ><KyTab name="disabled" title="不可用" disabled>不可用内容。</KyTab></KyTabs
  >
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { KyTab, KyTabs } from '../index';
defineProps<{ configProps: Record<string, unknown> }>();
const active = ref('overview');
</script>
