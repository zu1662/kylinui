<template><KySwitch v-model="value" label="接收行程变更提醒" /></template>
<script setup lang="ts">
import { ref } from 'vue';
import KySwitch from '../index';
const value = ref(true);
// 可见文本与 aria-label 使用同一份标签内容。
</script>
