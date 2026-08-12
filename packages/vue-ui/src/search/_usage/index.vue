<template>
  <div class="search-usage">
    <KySearch
      v-model="keyword"
      v-bind="configProps"
      @search="result = '搜索：' + $event"
      @action="keyword = ''"
    />
    <p>{{ result || '输入关键词后按回车' }}</p>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import KySearch from '../index';
defineProps<{ configProps: Record<string, unknown> }>();
const keyword = ref('');
const result = ref('');
</script>
<style scoped>
.search-usage {
  min-height: 220px;
  padding-top: 12px;
  background: var(--ky-color-page-bg);
}
.search-usage p {
  padding: 16px;
  color: var(--ky-color-text-secondary);
}
</style>
