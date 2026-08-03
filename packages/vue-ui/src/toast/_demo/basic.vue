<template>
  <div class="ky-demo-row">
    <KyButton size="small" @click="showToast({ message: '保存成功', type: 'success' })"
      >成功</KyButton
    >
    <KyButton
      size="small"
      variant="danger"
      @click="showToast({ message: '网络连接失败，请重试', type: 'error' })"
      >失败</KyButton
    >
  </div>
</template>
<script setup lang="ts">
import KyButton from '../../button';
import { showToast } from '../index';
// 失败提示保留更长阅读时间，重要错误仍应在页面内补充原因。
</script>
