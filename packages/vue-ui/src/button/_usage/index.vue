<template><KyButton v-bind="configProps">主要操作</KyButton></template>
<script setup lang="ts">
import KyButton from '../index';
// 文档站将控件值原样传入组件，便于观察组合效果。
defineProps<{ configProps: Record<string, unknown> }>();
</script>
