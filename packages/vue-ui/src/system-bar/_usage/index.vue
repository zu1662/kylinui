<template>
  <div class="system-bar-demo">
    <KySystemBar v-bind="configProps" @back="showToast('已触发返回事件')">
      <template #right><button class="capsule" type="button" aria-label="更多操作">•••</button></template>
    </KySystemBar>
    <KyToast />
  </div>
</template>
<script setup lang="ts">
import KyToast, { showToast } from '../../toast';
import KySystemBar from '../index';
defineProps<{ configProps: Record<string, unknown> }>();
// 返回动作通过事件交给路由层处理，组件本身不耦合具体路由库。
</script>
