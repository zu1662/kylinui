<template><KySteps :items="items" :current="2" direction="vertical" /></template>
<script setup lang="ts">
import KySteps from '../index';
const items = [
  { title: '到达车站', description: '08:30' },
  { title: '完成检票', description: '09:10' },
  { title: '列车运行中', description: '当前步骤' },
  { title: '抵达目的地' },
];
// 垂直步骤适合展示包含时间与说明的长流程。
</script>
