<template>
  <div class="iconx-demo">
    <div v-for="icon in icons" :key="icon.name" class="iconx-demo__item">
      <KyIconX :name="icon.name" :size="28" color="var(--ky-color-brand-strong)" />
      <code>{{ icon.name }}</code>
      <span>{{ icon.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import KyIconX from '../index';

const icons = [
  { name: 'arrow-left', label: '返回' },
  { name: 'arrow-right', label: '前进' },
  { name: 'close', label: '关闭' },
  { name: 'checked', label: '成功' },
  { name: 'warning', label: '警告' },
  { name: 'loading', label: '加载' },
  { name: 'plus1', label: '增加' },
  { name: 'reduce', label: '减少' },
  { name: 'enshrine', label: '收藏' },
];
</script>

<style scoped lang="less">
.iconx-demo {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.iconx-demo__item {
  display: grid;
  gap: 6px;
  place-items: center;
  min-width: 0;
  padding: 14px 6px;
  text-align: center;
  background: var(--ky-color-surface);
  border: 1px solid var(--ky-color-divider);
  border-radius: var(--ky-radius-md);
}

.iconx-demo__item code {
  max-width: 100%;
  overflow: hidden;
  color: var(--ky-color-text-secondary);
  font-size: 10px;
  text-overflow: ellipsis;
}

.iconx-demo__item span {
  font-size: var(--ky-font-size-assist);
}
</style>
