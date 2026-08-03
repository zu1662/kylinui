<template><KySteps v-bind="configProps" :items="items" /></template>
<script setup lang="ts">
import KySteps from '../index';
defineProps<{ configProps: Record<string, unknown> }>();
const items = [
  { title: '提交订单', description: '信息已确认' },
  { title: '等待支付', description: '剩余 15 分钟' },
  { title: '出票中', description: '预计 5 分钟' },
  { title: '行程完成' },
];
// 当前步骤由配置面板控制，状态计算由组件内部统一完成。
</script>
