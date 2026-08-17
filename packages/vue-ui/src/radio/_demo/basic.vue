<template>
  <KyRadioGroup v-model="value" direction="horizontal" aria-label="行程类型">
    <KyRadio value="direct" label="直达" />
    <KyRadio value="transfer" label="中转" />
    <KyRadio value="charter" label="包机" disabled />
  </KyRadioGroup>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { KyRadio, KyRadioGroup, type RadioValue } from '../index';
const value = ref<RadioValue>('direct');
// 分组会生成稳定的原生 name，键盘与辅助技术可识别互斥关系。
</script>
