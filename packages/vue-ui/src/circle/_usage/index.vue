<template>
  <div class="circle-usage"><KyCircle v-bind="configProps" /></div>
</template>
<script setup lang="ts">
import KyCircle from '../index';
defineProps<{ configProps: Record<string, unknown> }>();
</script>
<style scoped>
.circle-usage {
  display: grid;
  min-height: 260px;
  place-items: center;
}
</style>
