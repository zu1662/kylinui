<template>
  <div class="ky-demo-stack">
    <KyCheckbox v-model="insurance" label="启用自动同步" /><KyCheckbox
      v-model="notice"
      label="接收优惠通知"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import KyCheckbox from '../index';
const insurance = ref(false);
const notice = ref(true);
// 多个复选项可以相互独立，不使用互斥的 name 约束。
</script>
