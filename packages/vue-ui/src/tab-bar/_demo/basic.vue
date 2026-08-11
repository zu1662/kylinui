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
  { title: '首页', icon: 'home-line' },
  { title: '消息', icon: 'notice-line' },
  { title: '订单帮助', icon: 'order-line' },
];
const descriptions = ['查看最新内容', '查看消息通知', '处理订单相关问题'];
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
