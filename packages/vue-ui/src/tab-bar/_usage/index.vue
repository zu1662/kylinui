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
  { label: '机票', value: 'flight', icon: 'flight-line' },
  { label: '火车票', value: 'train', icon: 'train-line', badge: 2 },
  { label: '酒店', value: 'hotel', icon: 'hotel-line' },
  { label: '用车', value: 'car', icon: 'car-line' },
  { label: '门票', value: 'ticket', icon: 'spot-ticket-line' },
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
