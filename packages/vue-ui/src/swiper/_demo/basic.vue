<template>
  <KySwiper :data="cards" autoplay :interval="2600" :gap="12" :scale="0.92">
    <template #item="{ item }">
      <div class="swiper-demo__card">
        <strong>{{ typeof item === 'string' ? item : item.title }}</strong>
        <span>{{ typeof item === 'string' ? '' : item.caption }}</span>
      </div>
    </template>
  </KySwiper>
</template>

<script setup lang="ts">
import KySwiper from '../index';

const cards = [
  { title: '灵活退改', caption: '行程有变也能从容处理' },
  { title: '航班提醒', caption: '及时接收值机与登机信息' },
  { title: '行李服务', caption: '按需购买额外托运行李' },
];
</script>

<style scoped lang="less">
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

.swiper-demo__card span {
  color: var(--ky-color-text-secondary);
}
</style>
