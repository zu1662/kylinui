<template><KyCheckbox v-model="value" :label="String(configProps.label || '同意协议')" v-bind="configProps" /></template>
<script setup lang="ts">
import { ref } from 'vue';
import KyCheckbox from '../index';
defineProps<{ configProps: Record<string, unknown> }>();
const value = ref(true);
// 半选状态主要用于父子选项汇总，仍由业务维护真实选择集合。
</script>
