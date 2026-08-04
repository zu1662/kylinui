<template>
  <div>
    <KyTabBar v-model="current" :data="tabs" v-bind="configProps" />
    <div class="tab-bar-usage__content">当前频道：{{ currentLabel }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import KyTabBar from '../index';

defineProps<{ configProps: Record<string, unknown> }>();
const current = ref('flight');
const tabs = [
  { label: '机票', value: 'flight' },
  { label: '火车票', value: 'train', badge: 2 },
  { label: '酒店', value: 'hotel' },
  { label: '用车', value: 'car' },
  { label: '门票', value: 'ticket' },
];
const currentLabel = computed(() => tabs.find((item) => item.value === current.value)?.label);
</script>

<style scoped lang="less">
.tab-bar-usage__content {
  min-height: 180px;
  padding: 32px 16px;
  color: var(--ky-color-text-secondary);
  text-align: center;
  background: var(--ky-color-surface);
}
</style>
