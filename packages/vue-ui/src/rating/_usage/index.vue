<template><KyRating v-model="value" v-bind="configProps" /></template>
<script setup lang="ts">
import { ref } from 'vue';
import KyRating from '../index';
defineProps<{ configProps: Record<string, unknown> }>();
const value = ref(4);
// 星级按钮与数值输出同步，帮助用户确认当前选择。
</script>
