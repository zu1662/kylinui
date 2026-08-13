<template>
  <section class="skeleton-demo">
    <div class="skeleton-demo__preview" aria-live="polite">
      <KySkeleton :loading="loading" title avatar :row="3" :row-width="['100%', '100%', '46%']">
        <article class="skeleton-demo__loaded">
          <span class="skeleton-demo__avatar" aria-hidden="true">麒</span>
          <div class="skeleton-demo__content">
            <strong>行程方案已生成</strong>
            <p>已为你整理好推荐路线与服务安排。</p>
            <small>预计游玩 3 天 · 6 个精选地点</small>
          </div>
        </article>
      </KySkeleton>
    </div>

    <KyButton block variant="secondary" :disabled="!loading" @click="loading = false">
      {{ loading ? '加载完成' : '已加载' }}
    </KyButton>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KyButton from '../../button';
import KySkeleton from '../index';

const loading = ref(true);
</script>

<style scoped lang="less">
.skeleton-demo {
  display: grid;
  gap: var(--ky-space-4);
  width: 100%;
  padding: var(--ky-space-6) var(--ky-space-4);
}

.skeleton-demo__preview {
  min-height: 116px;
}

.skeleton-demo__loaded {
  display: flex;
  gap: var(--ky-space-3);
  align-items: center;
  padding: var(--ky-space-4);
  background: var(--ky-color-brand-soft);
  border-radius: var(--ky-radius-md);
}

.skeleton-demo__avatar {
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  width: 40px;
  height: 40px;
  font-weight: var(--ky-font-semibold);
  color: var(--ky-color-on-brand);
  background: var(--ky-color-brand-strong);
  border-radius: var(--ky-radius-pill);
}

.skeleton-demo__content {
  display: grid;
  gap: var(--ky-space-1);
  min-width: 0;
}

.skeleton-demo__content strong {
  font-size: var(--ky-font-size-body-strong);
  color: var(--ky-color-text-primary);
}

.skeleton-demo__content p,
.skeleton-demo__content small {
  margin: 0;
  font-size: var(--ky-font-size-assist);
  color: var(--ky-color-text-secondary);
}
</style>
