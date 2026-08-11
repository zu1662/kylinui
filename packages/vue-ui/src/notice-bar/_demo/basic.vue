<template>
  <div class="ky-demo-stack">
    <KyNoticeBar text="重要通知：请及时完成账户认证。" mode="link" /><KyNoticeBar
      text="这是一条可以关闭的通知。"
      mode="closeable"
    /><KyNoticeBar
      wrapable
      :scrollable="false"
      text="较长内容可开启多行展示，避免用户错过重要信息。"
    />
  </div>
</template>
<script setup lang="ts">
import KyNoticeBar from '../index';
</script>
<style scoped>
.demo-target {
  display: inline-grid;
  min-width: 64px;
  height: 40px;
  padding: 0 12px;
  place-items: center;
  background: var(--ky-color-brand-soft);
  border-radius: var(--ky-radius-sm);
}
.ky-demo-stack {
  display: grid;
  gap: 20px;
}
.demo-count b {
  display: inline-grid;
  min-width: 30px;
  height: 30px;
  place-items: center;
  color: #fff;
  background: var(--ky-color-brand-strong);
  border-radius: 6px;
}
</style>
