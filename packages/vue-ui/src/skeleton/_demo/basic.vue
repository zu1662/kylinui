<template>
  <div class="skeleton-demo">
    <KySkeleton title avatar :row="3" />
    <KySkeleton round :row="2" :row-width="['100%', '45%']" />
    <div class="skeleton-demo__interactive">
      <KySkeleton :loading="loading" title :row="2">
        <div class="skeleton-demo__loaded">加载完成</div>
      </KySkeleton>
      <KyButton size="small" variant="secondary" :disabled="!loading" @click="loading = false">
        {{ loading ? '加载完成' : '已加载' }}
      </KyButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KyButton from '../../button';
import KySkeleton from '../index';

const loading = ref(true);
</script>

<style scoped>
.skeleton-demo {
  display: grid;
  gap: var(--ky-space-7);
  padding: var(--ky-space-6) var(--ky-space-4);
}

.skeleton-demo__interactive {
  display: grid;
  gap: var(--ky-space-4);
  justify-items: start;
}

.skeleton-demo__loaded {
  width: 100%;
  padding: var(--ky-space-5);
  background: var(--ky-color-brand-soft);
  border-radius: var(--ky-radius-md);
}
</style>
