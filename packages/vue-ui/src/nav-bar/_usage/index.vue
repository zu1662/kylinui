<template>
  <div class="nav-bar-usage">
    <KyNavBar
      v-bind="configProps"
      :before-back="confirmBack"
      @click-left="status = '左侧操作已确认'"
      @click-right="status = '点击右侧操作'"
    />
    <p>{{ status }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KyNavBar from '../index';

defineProps<{ configProps: Record<string, unknown> }>();
const status = ref('点击左右操作区体验标准 MouseEvent');
async function confirmBack() {
  status.value = '正在确认返回…';
  await new Promise((resolve) => setTimeout(resolve, 450));
  return true;
}
</script>

<style scoped>
.nav-bar-usage {
  min-height: 240px;
  background: var(--ky-color-page-bg);
}

.nav-bar-usage p {
  margin: 0;
  padding: var(--ky-space-6) var(--ky-space-4);
  color: var(--ky-color-text-secondary);
  text-align: center;
}
</style>
