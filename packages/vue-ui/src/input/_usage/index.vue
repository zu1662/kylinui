<template><KyInput v-model="value" v-bind="configProps" /></template>
<script setup lang="ts">
import { ref } from 'vue';
import KyInput from '../index';
defineProps<{ configProps: Record<string, unknown> }>();
const value = ref('138 0000 0000');
// 受控值独立于配置项，切换样式不会丢失正在编辑的内容。
</script>
