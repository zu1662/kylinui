<template>
  <div class="icon-demo">
    <div v-for="item in icons" :key="item.name" class="icon-demo__item">
      <KyIcon :name="item.name" :size="28" color="var(--ky-color-brand)" />
      <span>{{ item.label }}</span>
      <code>{{ item.name }}</code>
    </div>
  </div>
</template>

<script setup lang="ts">
import KyIcon from '../index';

const icons = [
  { name: 'arrow-right', label: '向右' },
  { name: 'information-line', label: '说明' },
  { name: 'checked', label: '完成' },
  { name: 'calendar-line', label: '日历' },
  { name: 'edit-line', label: '编辑' },
  { name: 'trash-line', label: '删除' },
];
</script>

<style scoped lang="less">
.icon-demo {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.icon-demo__item {
  display: grid;
  gap: 8px;
  justify-items: center;
  padding: 16px 8px;
  text-align: center;
  background: var(--ky-color-surface);
  border: 1px solid var(--ky-color-divider);
  border-radius: var(--ky-radius-md);
}

.icon-demo__item code {
  max-width: 100%;
  overflow: hidden;
  color: var(--ky-color-text-secondary);
  font-size: 10px;
  text-overflow: ellipsis;
}
</style>
