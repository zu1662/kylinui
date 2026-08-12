<template>
  <div class="search-demo">
    <KySearch v-model="first" placeholder="搜索订单" /><KySearch
      v-model="second"
      label="范围"
      shape="square"
      show-action
      action-text="取消"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import KySearch from '../index';
const first = ref('');
const second = ref('青玉');
</script>
<style scoped>
.search-demo {
  display: grid;
  gap: 16px;
  padding: 16px 0;
  background: var(--ky-color-page-bg);
}
</style>
