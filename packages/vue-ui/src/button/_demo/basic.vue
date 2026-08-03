<template>
  <div class="ky-demo-row">
    <KyButton>主要操作</KyButton><KyButton variant="secondary">次要操作</KyButton
    ><KyButton variant="gradient">品牌渐变</KyButton><KyButton variant="danger">删除</KyButton>
  </div>

  <div data-gesture-fixture style="display:grid;gap:12px;margin-top:20px">
    <p v-for="index in 18" :key="index" style="margin:0;padding:18px;border-radius:12px;background:#fff">手势滚动验证 {{ index }}</p>
  </div>
</template>
<script setup lang="ts">
import KyButton from '../index';
// 基础示例覆盖设计规范中最常用的四类操作层级。
</script>
