<template>
  <div class="list-demo">
    <p class="list-demo__tip">继续滚动；第二轮会模拟失败，可点击状态提示重试。</p>
    <div class="list-demo__scroller">
      <KyList
        v-model:loading="loading"
        v-model:error="error"
        :finished="finished"
        finished-text="全部内容已加载"
        @load="loadMore"
      >
        <article v-for="item in items" :key="item" class="list-demo__item">
          <strong>内容 {{ item }}</strong>
          <span>滚动接近底部后自动追加下一批内容</span>
        </article>
      </KyList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KyList from '../index';

const items = ref(Array.from({ length: 7 }, (_, index) => index + 1));
const loading = ref(false);
const error = ref(false);
const finished = ref(false);
let attempts = 0;

function loadMore() {
  window.setTimeout(() => {
    attempts += 1;
    if (attempts === 2) {
      error.value = true;
      loading.value = false;
      return;
    }
    const start = items.value.length + 1;
    items.value.push(...Array.from({ length: 5 }, (_, index) => start + index));
    finished.value = items.value.length >= 22;
    loading.value = false;
  }, 600);
}
</script>

<style scoped>
.list-demo {
  padding: var(--ky-space-4);
  background: var(--ky-color-page-bg);
}

.list-demo__tip {
  margin: 0 0 var(--ky-space-3);
  font-size: var(--ky-font-size-assist);
  color: var(--ky-color-text-secondary);
}

.list-demo__scroller {
  height: 420px;
  overflow-y: auto;
  border-radius: var(--ky-radius-lg);
}

.list-demo__item {
  display: grid;
  gap: var(--ky-space-1);
  padding: var(--ky-space-4);
  color: var(--ky-color-text-primary);
  background: var(--ky-color-surface);
  border-bottom: 1px solid var(--ky-color-divider);
}

.list-demo__item span {
  font-size: var(--ky-font-size-assist);
  color: var(--ky-color-text-secondary);
}
</style>
