<template>
  <KySwiper :data="items" v-bind="configProps">
    <template #item="{ item, index }">
      <article class="swiper-usage__card" :class="`is-${index}`">
        <small>精选目的地</small>
        <strong>{{ typeof item === 'string' ? item : item.title }}</strong>
        <span>{{ typeof item === 'string' ? '' : item.description }}</span>
      </article>
    </template>
  </KySwiper>
</template>

<script setup lang="ts">
import KySwiper from '../index';

defineProps<{ configProps: Record<string, unknown> }>();
const items = [
  { title: '上海周末游', description: '往返机票 · 2 天 1 晚' },
  { title: '成都美食行', description: '精品酒店 · 3 天 2 晚' },
  { title: '厦门看海', description: '自由行程 · 2 天 1 晚' },
];
</script>

<style scoped lang="less">
.swiper-usage__card {
  display: grid;
  gap: 10px;
  min-height: 190px;
  align-content: end;
  padding: 24px;
  color: var(--ky-color-text-primary);
  background: var(--ky-gradient-brand-soft);
}

.swiper-usage__card.is-1 {
  background: var(--ky-color-warning-soft);
}

.swiper-usage__card.is-2 {
  background: var(--ky-color-info-soft);
}

.swiper-usage__card strong {
  font-size: var(--ky-font-size-display);
}
</style>
