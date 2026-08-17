<template>
  <KyRadioGroup v-model="value" name="plan" aria-label="方案选择">
    <KyRadio value="basic" :label="String(configProps.label || '基础方案')" v-bind="configProps" />
    <KyRadio value="advanced" label="进阶方案" />
  </KyRadioGroup>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { KyRadio, KyRadioGroup, type RadioValue } from '../index';
defineProps<{ configProps: Record<string, unknown> }>();
const value = ref<RadioValue>('basic');
// Group 统一提供原生 name 和禁用状态，子项仍保留原始选项值类型。
</script>
