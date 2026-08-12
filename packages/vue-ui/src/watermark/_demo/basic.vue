<template>
  <div class="watermark-demo">
    <KyWatermark :content="['内部资料', '仅供预览']"
      ><section class="watermark-demo__card">
        <strong>季度简报</strong>
        <p>多行文字会在每个网格单元中居中排列。</p>
        <button type="button" @click="clicked = !clicked">
          {{ clicked ? '已响应' : '点击验证' }}
        </button>
      </section></KyWatermark
    >
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import KyWatermark from '../index';
const clicked = ref(false);
</script>
<style scoped>
.watermark-demo {
  padding: var(--ky-space-5);
}
.watermark-demo__card {
  min-height: 240px;
  padding: var(--ky-space-5);
  background: var(--ky-color-surface);
  border: 1px solid var(--ky-color-divider);
  border-radius: var(--ky-radius-lg);
}
.watermark-demo__card p {
  color: var(--ky-color-text-secondary);
}
.watermark-demo__card button {
  min-height: 40px;
  padding: 0 var(--ky-space-4);
}
</style>
