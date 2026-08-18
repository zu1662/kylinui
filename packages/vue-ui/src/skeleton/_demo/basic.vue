<template>
  <div class="skeleton-demo">
    <section v-for="preset in presets" :key="preset">
      <h3>{{ preset }} 预设</h3>
      <KySkeleton :preset="preset" :list-count="2" />
    </section>
    <section>
      <h3>自定义组合</h3>
      <KySkeleton avatar title :row="4" :row-width="['100%', '92%', '78%', '55%']" />
    </section>
  </div>
</template>

<script setup lang="ts">
import type { SkeletonPreset } from '../index';
import KySkeleton from '../index';

const presets: SkeletonPreset[] = ['avatar', 'title', 'paragraph', 'list'];
</script>

<style scoped>
.skeleton-demo {
  display: grid;
  gap: var(--ky-space-6);
  padding: var(--ky-space-4);
}

.skeleton-demo h3 {
  margin: 0 0 var(--ky-space-3);
  color: var(--ky-color-text-secondary);
  font-size: var(--ky-font-size-assist);
}
</style>
