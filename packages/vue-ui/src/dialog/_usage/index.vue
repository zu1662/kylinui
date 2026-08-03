<template>
  <div>
    <KyButton @click="visible = true">打开对话框</KyButton>
    <KyDialog v-model="visible" v-bind="configProps" :title="String(configProps.title || '确认操作')" @confirm="visible = false" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import KyButton from '../../button';
import KyDialog from '../index';
defineProps<{ configProps: Record<string, unknown> }>();
const visible = ref(false);
// 确认事件是否真正关闭由业务决定，便于接入异步提交。
</script>
