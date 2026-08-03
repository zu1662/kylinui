<template><KyRating v-model="value" label="行程满意度" /></template>
<script setup lang="ts">
import { ref } from 'vue';
import KyRating from '../index';
const value = ref(5);
// 评分组件提供明确的 radiogroup 语义。
</script>
