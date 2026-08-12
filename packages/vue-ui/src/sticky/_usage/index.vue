<template>
  <div class="sticky-usage">
    <p>向下滚动</p>
    <KySticky v-bind="configProps"><div class="sticky-usage__bar">粘性内容</div></KySticky>
    <div class="sticky-usage__space" />
  </div>
</template>
<script setup lang="ts">
import KySticky from '../index';
defineProps<{ configProps: Record<string, unknown> }>();
</script>
<style scoped>
.sticky-usage {
  height: 420px;
  overflow: auto;
  background: var(--ky-color-page-bg);
}
.sticky-usage p {
  padding: 24px;
  text-align: center;
}
.sticky-usage__bar {
  padding: 14px 18px;
  color: var(--ky-color-on-brand);
  background: var(--ky-color-brand-strong);
}
.sticky-usage__space {
  height: 700px;
}
</style>
