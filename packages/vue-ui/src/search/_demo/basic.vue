<template>
  <div class="search-demo">
    <section>
      <h3>搜索建议</h3>
      <KySearch
        v-model="keyword"
        show-action
        show-suggestions
        :suggestions="suggestions"
        @search="message = '搜索：' + $event"
        @cancel="message = '已取消'"
        @suggestion="message = '已选择：' + $event.value"
      />
      <p>{{ message }}</p>
    </section>
    <section>
      <h3>加载与方形轮廓</h3>
      <KySearch v-model="loadingKeyword" shape="square" loading placeholder="正在获取联想词" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { SearchSuggestion } from '../index';
import KySearch from '../index';

const keyword = ref('');
const loadingKeyword = ref('移动端组件');
const message = ref('输入关键词后提交或选择建议');
const suggestions: SearchSuggestion[] = [
  { value: 'Search 搜索' },
  { value: 'Input 输入框' },
  { value: 'Textarea 文本域' },
];
</script>

<style scoped>
.search-demo {
  display: grid;
  gap: var(--ky-space-5);
  padding: var(--ky-space-4) 0;
  background: var(--ky-color-page-bg);
}

.search-demo section,
.search-demo p {
  margin: 0;
}

.search-demo h3 {
  margin: 0 0 var(--ky-space-2);
  padding: 0 var(--ky-space-3);
  color: var(--ky-color-text-secondary);
  font-size: var(--ky-font-size-assist);
}

.search-demo p {
  padding: var(--ky-space-3);
  color: var(--ky-color-text-secondary);
}
</style>
