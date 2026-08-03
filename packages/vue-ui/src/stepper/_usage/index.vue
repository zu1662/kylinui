<template><KyStepper v-model="value" v-bind="configProps" /></template>
<script setup lang="ts">
import { ref } from 'vue';
import KyStepper from '../index';
defineProps<{ configProps: Record<string, unknown> }>();
const value = ref(1);
// 数值始终经过最小值、最大值和步长归一化。
</script>
