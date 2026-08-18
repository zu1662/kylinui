<template>
  <div class="nav-bar-demo">
    <section>
      <h3>基础导航</h3>
      <KyNavBar title="订单详情" left-arrow left-text="返回" right-text="帮助" />
    </section>
    <section>
      <h3>异步返回拦截</h3>
      <KyNavBar
        title="编辑资料"
        theme="gradient"
        left-arrow
        right-text="保存"
        :before-back="beforeBack"
        @click-left="message = '允许返回'"
        @click-right="message = '保存资料'"
      />
      <p>{{ message }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KyNavBar from '../index';

const message = ref('点击返回后等待异步确认');
async function beforeBack() {
  message.value = '确认中…';
  await new Promise((resolve) => setTimeout(resolve, 500));
  return true;
}
</script>

<style scoped>
.nav-bar-demo {
  display: grid;
  gap: var(--ky-space-6);
  padding: var(--ky-space-4);
  background: var(--ky-color-page-bg);
}

.nav-bar-demo h3,
.nav-bar-demo p {
  margin: 0 0 var(--ky-space-2);
  color: var(--ky-color-text-secondary);
  font-size: var(--ky-font-size-assist);
}

.nav-bar-demo p {
  margin: var(--ky-space-3) 0 0;
  text-align: center;
}
</style>
