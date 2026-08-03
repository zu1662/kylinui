<template><KyButton v-bind="configProps">主要操作</KyButton>
  <div data-gesture-fixture style="display:grid;gap:12px;margin-top:20px">
    <p v-for="index in 18" :key="index" style="margin:0;padding:18px;border-radius:12px;background:#fff">手势滚动验证 {{ index }}</p>
  </div>
</template>
<script setup lang="ts">
import KyButton from '../index';
// 文档站将控件值原样传入组件，便于观察组合效果。
defineProps<{ configProps: Record<string, unknown> }>();
</script>
