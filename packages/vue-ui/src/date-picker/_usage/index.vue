<template>
  <div>
    <KyDatePicker
      v-model="value"
      :min-date="minDate"
      :max-date="maxDate"
      v-bind="configProps"
      @confirm="confirmed = formatDate($event.value)"
    />
    <p class="date-picker-usage__result">已确认：{{ confirmed }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KyDatePicker from '../index';

defineProps<{ configProps: Record<string, unknown> }>();
const minDate = new Date(2024, 0, 1);
const maxDate = new Date(2030, 11, 31);
const value = ref(new Date(2026, 7, 19));
const confirmed = ref(formatDate(value.value));

function formatDate(date: Date) {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    .map((part, index) => (index === 0 ? String(part) : String(part).padStart(2, '0')))
    .join('-');
}
</script>

<style scoped lang="less">
.date-picker-usage__result {
  margin: var(--ky-space-4) 0 0;
  color: var(--ky-color-text-secondary);
  text-align: center;
}
</style>
