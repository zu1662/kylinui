<template>
  <KyFormCard v-bind="configProps">
    <KyInput v-model="name" label="姓名" placeholder="请输入联系人姓名" />
    <KyInput v-model="phone" label="手机号" type="tel" placeholder="请输入手机号" />
  </KyFormCard>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import KyInput from '../../input';
import KyFormCard from '../index';
defineProps<{ configProps: Record<string, unknown> }>();
const name = ref('');
const phone = ref('');
// 表单卡片只提供分组容器，字段状态仍由各输入组件独立维护。
</script>
