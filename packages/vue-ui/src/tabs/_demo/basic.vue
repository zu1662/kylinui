<template>
  <div class="tabs-demo">
    <KyTabs v-model="active" animated
      ><KyTab name="all" title="全部">全部内容</KyTab
      ><KyTab name="pending" title="待处理" badge="5">待处理内容</KyTab
      ><KyTab name="done" title="已完成" dot>已完成内容</KyTab
      ><KyTab name="disabled" title="禁用" disabled>禁用内容</KyTab></KyTabs
    ><KyTabs v-model="card" type="card"
      ><KyTab name="day" title="日榜">日榜数据</KyTab
      ><KyTab name="week" title="周榜">周榜数据</KyTab></KyTabs
    >
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { KyTab, KyTabs } from '../index';
const active = ref('all');
const card = ref('day');
</script>
<style scoped>
.tabs-demo {
  display: grid;
  gap: 28px;
  padding: 12px 0;
}
</style>
