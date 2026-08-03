<template>
  <div><KyButton @click="open">显示 Toast</KyButton></div>
</template>
<script setup lang="ts">
import KyButton from '../../button';
import { showToast, type ToastType } from '../index';
const props = defineProps<{ configProps: Record<string, unknown> }>();
// 触发时读取最新配置，支持不刷新页面切换反馈状态。
function open() {
  showToast({
    message: String(props.configProps.message || '操作成功'),
    type: props.configProps.type as ToastType,
  });
}
</script>
