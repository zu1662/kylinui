<template>
  <div class="ky-demo-stack">
    <KyInput v-model="name" label="联系人姓名" placeholder="请输入真实姓名" clearable />
    <KyInput model-value="123" label="证件号" error="证件号码格式不正确" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import KyInput from '../index';
const name = ref('');
// 错误信息与字段相邻展示，不能仅依赖 Toast 提示。
</script>
