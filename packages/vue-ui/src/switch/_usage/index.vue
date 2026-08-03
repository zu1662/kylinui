<template><KySwitch v-model="value" :label="String(configProps.label || '接收提醒')" v-bind="configProps" /></template>
<script setup lang="ts">
import { ref } from 'vue';
import KySwitch from '../index';
defineProps<{ configProps: Record<string, unknown> }>();
const value = ref(true);
// 开关用于立即生效的设置，不应替代需要提交确认的选项。
</script>
