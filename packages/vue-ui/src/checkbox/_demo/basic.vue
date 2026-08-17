<template>
  <div class="ky-demo-stack">
    <KyCheckboxGroup ref="groupRef" v-model="selected" :max="2" aria-label="通知方式">
      <KyCheckbox value="sync" label="启用自动同步" />
      <KyCheckbox value="discount" label="接收优惠通知" />
      <KyCheckbox value="system" label="接收系统通知" disabled />
    </KyCheckboxGroup>
    <div class="ky-demo-row">
      <KyButton size="small" variant="secondary" @click="groupRef?.toggleAll({ checked: true })">
        全选可用项
      </KyButton>
      <span>已选：{{ selected.join('、') || '无' }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import KyButton from '../../button';
import {
  KyCheckbox,
  KyCheckboxGroup,
  type CheckboxGroupExpose,
  type CheckboxValue,
} from '../index';
const selected = ref<CheckboxValue[]>(['sync']);
const groupRef = ref<CheckboxGroupExpose>();
// 全选会跳过禁用项，并继续受 max 约束。
</script>
