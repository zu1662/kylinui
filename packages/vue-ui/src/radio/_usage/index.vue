<template>
  <div class="ky-demo-stack">
    <KyRadio
      v-model="value"
      value="basic"
      name="plan"
      :label="String(configProps.label || '基础方案')"
      v-bind="configProps"
    />
    <KyRadio v-model="value" value="advanced" name="plan" label="进阶方案" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import KyRadio from '../index';
defineProps<{ configProps: Record<string, unknown> }>();
const value = ref<string | number | boolean>('basic');
// 同组单选共享 name，同时 v-model 保留原始选项值类型。
</script>
