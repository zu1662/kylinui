<template>
  <div class="number-keyboard-usage">
    <div class="number-keyboard-usage__value">{{ value || '等待输入' }}</div>
    <KyButton size="small" @click="visible = true">{{
      visible ? '键盘已打开' : '重新打开'
    }}</KyButton>
    <KyNumberKeyboard v-model="value" v-model:visible="visible" v-bind="configProps" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KyButton from '../../button';
import KyNumberKeyboard from '../index';

defineProps<{ configProps: Record<string, unknown> }>();
const value = ref('');
const visible = ref(true);
</script>

<style scoped lang="less">
.number-keyboard-usage {
  display: grid;
  gap: var(--ky-space-4);
  justify-items: center;
}

.number-keyboard-usage__value {
  min-width: 180px;
  min-height: 48px;
  padding: var(--ky-space-3) var(--ky-space-4);
  font-size: var(--ky-font-size-display);
  font-weight: var(--ky-font-semibold);
  color: var(--ky-color-text-primary);
  text-align: center;
  background: var(--ky-color-surface);
  border: 1px solid var(--ky-color-divider);
  border-radius: var(--ky-radius-md);
}
</style>
