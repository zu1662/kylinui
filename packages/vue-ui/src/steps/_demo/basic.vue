<template><KySteps :items="items" :current="2" direction="vertical" /></template>
<script setup lang="ts">
import KySteps from '../index';
const items = [
  { title: '创建任务', description: '08:30' },
  { title: '填写信息', description: '09:10' },
  { title: '确认提交', description: '当前步骤' },
  { title: '处理完成' },
];
// 垂直步骤适合展示包含时间与说明的长流程。
</script>
