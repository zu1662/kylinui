<template>
  <KyPopover v-model="visible" v-bind="configProps">
    <template #reference><KyButton variant="secondary">查看说明</KyButton></template>
    这是与当前操作相关的补充说明。
  </KyPopover>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import KyButton from '../../button';
import KyPopover from '../index';
defineProps<{ configProps: Record<string, unknown> }>();
// 显隐状态由示例自身维护，配置面板只控制展示属性。
const visible = ref(false);
</script>
