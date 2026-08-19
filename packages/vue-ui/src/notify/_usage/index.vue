<template>
  <div><KyButton @click="open">显示 Notify</KyButton></div>
</template>

<script setup lang="ts">
import KyButton from '../../button';
import { showNotify, type NotifyPosition, type NotifyType } from '../index';

const props = defineProps<{ configProps: Record<string, unknown> }>();

// 点击时读取最新实验台配置，避免切换参数后复用旧调用结果。
function open() {
  showNotify({
    message: String(props.configProps.message || '这是一条重要通知'),
    type: props.configProps.type as NotifyType,
    position: props.configProps.position as NotifyPosition,
    duration: Number(props.configProps.duration),
    showIcon: Boolean(props.configProps.showIcon),
    closeable: Boolean(props.configProps.closeable),
  });
}
</script>
