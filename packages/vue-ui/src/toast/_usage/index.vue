<template>
  <div><KyButton @click="open">显示 Toast</KyButton></div>
</template>

<script setup lang="ts">
import KyButton from '../../button';
import { showToast, type ToastPosition, type ToastType } from '../index';

const props = defineProps<{ configProps: Record<string, unknown> }>();

// 点击时读取最新实验台配置，避免切换参数后复用旧调用结果。
function open() {
  showToast({
    message: String(props.configProps.message || '提示内容'),
    type: props.configProps.type as ToastType,
    position: props.configProps.position as ToastPosition,
    duration: Number(props.configProps.duration),
    forbidClick: Boolean(props.configProps.forbidClick),
  });
}
</script>
