<template>
  <div class="nav-bar-demo">
    <KyNavBar
      v-bind="configProps"
      :before-back="beforeBack"
      @click-left="showToast('已触发返回事件')"
      @click-right="showToast('已触发右侧操作')"
    />
    <KyToast />
  </div>
</template>
<script setup lang="ts">
import KyToast, { showToast } from '../../toast';
import KyNavBar from '../index';

defineProps<{ configProps: Record<string, unknown> }>();

function beforeBack() {
  return true;
}
</script>
