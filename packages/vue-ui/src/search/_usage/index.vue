<template>
  <div class="search-usage">
    <KySearch
      v-model="keyword"
      v-bind="configProps"
      :suggestions="suggestions"
      :formatter="trimLeadingSpaces"
      @search="result = '提交搜索：' + $event"
      @clear="result = '已清空关键词'"
      @cancel="result = '已取消搜索'"
      @suggestion="result = '选择建议：' + $event.value"
    />
    <p>{{ result || '输入关键词、选择建议或按软键盘搜索键提交' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { SearchSuggestion } from '../index';
import KySearch from '../index';

defineProps<{ configProps: Record<string, unknown> }>();
const keyword = ref('麒麟');
const result = ref('');
const suggestions: SearchSuggestion[] = [
  { value: '麒麟按钮', label: 'Button 按钮' },
  { value: '麒麟弹出层', label: 'Popup 弹出层' },
  { value: '历史搜索', disabled: true },
];
const trimLeadingSpaces = (value: string) => value.replace(/^\s+/, '');
</script>

<style scoped>
.search-usage {
  min-height: 260px;
  padding-top: var(--ky-space-3);
  background: var(--ky-color-page-bg);
}

.search-usage p {
  margin: 0;
  padding: var(--ky-space-5);
  color: var(--ky-color-text-secondary);
}
</style>
