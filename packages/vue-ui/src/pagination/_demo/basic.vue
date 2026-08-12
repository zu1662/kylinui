<template>
  <div class="pagination-demo">
    <KyPagination
      v-model="page"
      :total-items="120"
      :show-page-size="5"
      force-ellipses
    /><KyPagination v-model="simplePage" :page-count="8" mode="simple" /><KyPagination
      :model-value="2"
      :page-count="6"
      disabled
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import KyPagination from '../index';
const page = ref(5);
const simplePage = ref(2);
</script>
<style scoped>
.pagination-demo {
  display: grid;
  gap: var(--ky-space-5);
  padding: var(--ky-space-5) 0;
}
</style>
