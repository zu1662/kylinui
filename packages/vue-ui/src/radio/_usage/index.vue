<template>
  <div class="ky-demo-stack">
    <KyRadio
      v-model="value"
      value="economy"
      name="cabin"
      :label="String(configProps.label || '经济舱')"
      v-bind="configProps"
    />
    <KyRadio v-model="value" value="business" name="cabin" label="公务舱" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import KyRadio from '../index';
defineProps<{ configProps: Record<string, unknown> }>();
const value = ref<string | number | boolean>('economy');
// 同组单选共享 name，同时 v-model 保留原始选项值类型。
</script>
