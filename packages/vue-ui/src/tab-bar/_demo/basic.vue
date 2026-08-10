<template>
  <div class="tab-bar-demo">
    <KyTabBar v-model="current" :data="tabs" :fixed-count="3" />
    <p>{{ descriptions[current] }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KyTabBar from '../index';

const current = ref(0);
const tabs = [
  { title: '航班动态', icon: 'flight-line' },
  { title: '行李服务', icon: 'briefcase-line' },
  { title: '订单帮助', icon: 'order-line' },
];
const descriptions = ['查看当前航班状态', '了解托运行李与行李额规则', '处理订单改签与退票问题'];
</script>

<style scoped lang="less">
.tab-bar-demo p {
  margin: 0;
  padding: 32px 16px;
  color: var(--ky-color-text-secondary);
  text-align: center;
  background: var(--ky-color-surface);
}
</style>
