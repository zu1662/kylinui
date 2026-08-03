<template><KySlider v-model="value" label="计划游玩天数" :min="1" :max="12" /></template>
<script setup lang="ts">
import { ref } from 'vue';
import KySlider from '../index';
const value = ref(3);
// 连续拖动适合快速估算，精确数量也可使用步进器。
</script>
