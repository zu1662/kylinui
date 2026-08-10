<template>
  <div class="icon-demo">
    <p class="icon-demo__summary">Iconfont 共 {{ iconfontNames.length }} 个图标</p>
    <div class="icon-demo__grid">
      <div v-for="name in iconfontNames" :key="name" class="icon-demo__item">
        <KyIcon :name="name" source="iconfont" :size="28" color="var(--ky-color-brand-strong)" />
        <code :title="name">{{ name }}</code>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import KyIcon, { iconfontNames } from '../index';
</script>

<style scoped lang="less">
.icon-demo {
  display: grid;
  gap: 12px;
}

.icon-demo__summary {
  margin: 0;
  color: var(--ky-color-text-secondary);
  font-size: var(--ky-font-size-assist);
}

.icon-demo__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(112px, 1fr));
  gap: 10px;
}

.icon-demo__item {
  display: grid;
  gap: 8px;
  min-width: 0;
  place-items: center;
  padding: 14px 8px;
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
  white-space: nowrap;
}
</style>
