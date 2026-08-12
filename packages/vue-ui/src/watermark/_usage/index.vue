<template>
  <KyWatermark v-bind="configProps"
    ><article class="watermark-usage">
      <h3>项目摘要</h3>
      <p>水印覆盖在内容上方，但不会阻止下方按钮和链接响应交互。</p>
      <button type="button" @click="count += 1">点击测试 {{ count }}</button>
    </article></KyWatermark
  >
</template>
<script setup lang="ts">
import { ref } from 'vue';
import KyWatermark from '../index';
defineProps<{ configProps: Record<string, unknown> }>();
const count = ref(0);
</script>
<style scoped>
.watermark-usage {
  min-height: 260px;
  padding: var(--ky-space-5);
  background: var(--ky-color-surface);
  border: 1px solid var(--ky-color-divider);
  border-radius: var(--ky-radius-lg);
}
.watermark-usage h3 {
  margin-top: 0;
}
.watermark-usage button {
  min-height: 40px;
  padding: 0 var(--ky-space-4);
}
</style>
