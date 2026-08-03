<template>
  <KyFormCard title="乘机人" description="请填写与证件一致的信息">
    <KyInput v-model="name" label="姓名" /><KyInput v-model="id" label="证件号" />
  </KyFormCard>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import KyInput from '../../input';
import KyFormCard from '../index';
const name = ref('张三');
const id = ref('');
// 同一业务主题的字段集中在一个卡片中，减少页面认知负担。
</script>
