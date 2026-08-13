<template>
  <KyGrid v-bind="configProps">
    <KyGridItem v-for="item in items" :key="item.text" :icon="item.icon" :text="item.text" />
  </KyGrid>
</template>

<script setup lang="ts">
import { KyGrid, KyGridItem } from '../index';

defineProps<{ configProps: Record<string, unknown> }>();

const items = [
  { icon: 'home-line', text: '首页' },
  { icon: 'calendar-line', text: '日程' },
  { icon: 'smallbell-line', text: '消息' },
  { icon: 'mine-line', text: '我的' },
  { icon: 'enshrine-line', text: '收藏' },
  { icon: 'general-line', text: '设置' },
];
</script>
