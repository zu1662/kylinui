<template>
  <div class="ky-demo-stack">
    <KyInput
      v-model="name"
      label="联系人姓名"
      placeholder="请输入真实姓名"
      :max-length="20"
      show-word-limit
      clearable
    />
    <KyInput
      v-model="phone"
      label="手机号"
      placeholder="请输入手机号"
      input-mode="numeric"
      autocomplete="tel"
      enter-key-hint="done"
      :max-length="13"
      :formatter="formatPhone"
      clearable
    />
    <KyInput model-value="123" label="证件号" error="证件号码格式不正确" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import KyInput from '../index';
const name = ref('');
const phone = ref('');

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  return digits.replace(/(\d{3})(?=\d)/, '$1 ').replace(/(\d{4})(?=\d)/, '$1 ');
}
// 错误信息与字段相邻展示，不能仅依赖 Toast 提示。
</script>
