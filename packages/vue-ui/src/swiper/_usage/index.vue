<template>
  <KySwiper :data="items" v-bind="configProps">
    <template #item="{ item, index }">
      <article class="swiper-usage__card" :class="`is-${index}`">
        <small>精选内容</small>
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
  { title: '设计规范', description: '颜色、排版与间距说明' },
  { title: '组件示例', description: '常用交互与状态展示' },
  { title: '开发指南', description: '安装、配置与最佳实践' },
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
