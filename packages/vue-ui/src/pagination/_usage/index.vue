<template>
  <div class="pagination-usage">
    <KyPagination v-model="page" v-bind="configProps" />
    <p>当前第 {{ page }} 页</p>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import KyPagination from '../index';
defineProps<{ configProps: Record<string, unknown> }>();
const page = ref(4);
</script>
<style scoped>
.pagination-usage {
  display: grid;
  gap: var(--ky-space-4);
  min-height: 220px;
  place-content: center;
}
.pagination-usage p {
  margin: 0;
  color: var(--ky-color-text-secondary);
  text-align: center;
}
</style>
