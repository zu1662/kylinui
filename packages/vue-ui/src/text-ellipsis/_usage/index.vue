<template>
  <div class="text-ellipsis-usage"><KyTextEllipsis v-bind="configProps" :content="content" /></div>
</template>
<script setup lang="ts">
import KyTextEllipsis from '../index';
defineProps<{ configProps: Record<string, unknown> }>();
const content =
  '组件会根据容器宽度和文本实际高度判断是否溢出。内容较长时，可以通过展开按钮阅读全文；容器尺寸变化后，省略状态也会自动重新计算，适合卡片摘要、商品说明和通知详情等场景。';
</script>
<style scoped>
.text-ellipsis-usage {
  padding: var(--ky-space-5);
}
</style>
