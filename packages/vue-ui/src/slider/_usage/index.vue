<template><KySlider v-model="value" v-bind="configProps" /></template>
<script setup lang="ts">
import { ref } from 'vue';
import KySlider from '../index';
defineProps<{ configProps: Record<string, unknown> }>();
const value = ref(8);
// 实时值由 v-model 维护，配置面板可调整范围和步长。
</script>
