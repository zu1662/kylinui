<template>
  <div class="text-ellipsis-demo">
    <KyTextEllipsis :content="longText" :rows="2" /><KyTextEllipsis
      :content="shortText"
      :rows="2"
    />
  </div>
</template>
<script setup lang="ts">
import KyTextEllipsis from '../index';
const longText =
  '这是一个会随容器宽度重新测量的长文本示例。默认仅展示两行，用户可以展开阅读全文，也可以再次收起内容。';
const shortText = '短文本不会展示多余的操作按钮。';
</script>
<style scoped>
.text-ellipsis-demo {
  display: grid;
  gap: var(--ky-space-5);
  padding: var(--ky-space-5);
}
</style>
