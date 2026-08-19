<template>
  <div class="password-input-usage">
    <KyPasswordInput v-model="value" v-bind="configProps" @complete="handleComplete" />
    <div class="password-input-usage__status">{{ status }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import KyPasswordInput from '../index';

const props = defineProps<{ configProps: Record<string, unknown> }>();
const value = ref('');
const completedValue = ref('');
const length = computed(() => Number(props.configProps.length) || 6);
const status = computed(() => {
  if (completedValue.value) return `已完成：${completedValue.value}`;
  return `已输入 ${Array.from(value.value).length}/${length.value} 位`;
});

function handleComplete(nextValue: string) {
  completedValue.value = nextValue;
}

watch(length, (nextLength) => {
  value.value = Array.from(value.value).slice(0, nextLength).join('');
  completedValue.value = '';
});
</script>

<style scoped lang="less">
.password-input-usage {
  display: grid;
  gap: var(--ky-space-3);
  width: min(100%, 360px);
  margin: 0 auto;
}

.password-input-usage__status {
  font-size: var(--ky-font-size-body);
  color: var(--ky-color-text-secondary);
  text-align: center;
}
</style>
