<template>
  <div class="swiper-demo">
    <KySwiper :data="cards" autoplay :interval="2600" :gap="12" :scale="0.92">
      <template #item="{ item }">
        <div class="swiper-demo__card">
          <strong>{{ typeof item === 'string' ? item : item.title }}</strong>
          <span>{{ typeof item === 'string' ? '' : item.caption }}</span>
          <button type="button" @click="clickCount += 1">卡片操作</button>
        </div>
      </template>
    </KySwiper>
    <p aria-live="polite">卡片操作触发 {{ clickCount }} 次</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KySwiper from '../index';

const clickCount = ref(0);
const cards = [
  { title: '灵活配置', caption: '内容变化也能从容处理' },
  { title: '状态提醒', caption: '及时接收重要状态信息' },
  { title: '扩展服务', caption: '按需启用额外能力' },
];
</script>

<style scoped lang="less">
.swiper-demo {
  display: grid;
  gap: var(--ky-space-3);
}

.swiper-demo__card {
  display: grid;
  gap: 8px;
  min-height: 170px;
  align-content: center;
  padding: 24px;
  text-align: center;
  background: var(--ky-color-surface);
  border: 1px solid var(--ky-color-divider);
  border-radius: var(--ky-radius-lg);
}

.swiper-demo__card span,
.swiper-demo > p {
  color: var(--ky-color-text-secondary);
}

.swiper-demo__card button {
  justify-self: center;
  min-height: 36px;
  padding: 0 var(--ky-space-4);
  color: var(--ky-color-brand-strong);
  cursor: pointer;
  background: var(--ky-color-brand-soft);
  border: 0;
  border-radius: var(--ky-radius-md);
}

.swiper-demo > p {
  margin: 0;
  text-align: center;
}
</style>
