<template><KyTag v-if="!closed" v-bind="configProps" @close="closed = true">{{ closed ? '标签已关闭' : '标签' }}</KyTag></template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import KyTag from '../index';
const props = defineProps<{ configProps: Record<string, unknown> }>();
const closed = ref(false);
// 切换配置时恢复标签，避免关闭状态影响后续预览。
watch(() => props.configProps, () => { closed.value = false; }, { deep: true });
</script>
