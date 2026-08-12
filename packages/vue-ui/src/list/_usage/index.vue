<template>
  <div ref="scroller" class="list-usage">
    <KyList
      v-bind="configProps"
      v-model:loading="loading"
      v-model:error="error"
      :finished="finished"
      loading-text="正在加载"
      error-text="加载失败，点击重试"
      @load="loadMore"
    >
      <div v-for="item in items" :key="item" class="list-usage__item">列表项 {{ item }}</div>
    </KyList>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import KyList from '../index';

const props = defineProps<{ configProps: Record<string, unknown> }>();
const scroller = ref<HTMLElement | null>(null);
const items = ref(Array.from({ length: 8 }, (_, index) => index + 1));
const loading = ref(false);
const error = ref(false);
const finished = ref(false);
let timer = 0;

function loadMore() {
  window.clearTimeout(timer);
  timer = window.setTimeout(() => {
    const start = items.value.length + 1;
    const next = Array.from({ length: 5 }, (_, index) => start + index);
    if (props.configProps.direction === 'up') items.value.unshift(...next.reverse());
    else items.value.push(...next);
    finished.value = items.value.length >= 28;
    loading.value = false;
  }, 500);
}

watch(
  () => props.configProps.direction,
  async (direction) => {
    items.value = Array.from({ length: 8 }, (_, index) => index + 1);
    loading.value = false;
    error.value = false;
    finished.value = false;
    await nextTick();
    if (direction === 'up' && scroller.value)
      scroller.value.scrollTop = scroller.value.scrollHeight;
  },
);
</script>

<style scoped>
.list-usage {
  height: 420px;
  overflow-y: auto;
  background: var(--ky-color-page-bg);
}

.list-usage__item {
  padding: var(--ky-space-4);
  margin: 0 var(--ky-space-3);
  color: var(--ky-color-text-primary);
  background: var(--ky-color-surface);
  border-bottom: 1px solid var(--ky-color-divider);
}
</style>
