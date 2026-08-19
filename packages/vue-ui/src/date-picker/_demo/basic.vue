<template>
  <div class="date-picker-demo">
    <section>
      <h3>基础用法</h3>
      <KyDatePicker
        v-model="date"
        :min-date="new Date(2024, 0, 1)"
        :max-date="new Date(2030, 11, 31)"
        @confirm="dateMessage = `已选择 ${formatDate($event.value)}`"
      />
      <p>{{ dateMessage }}</p>
    </section>

    <section>
      <h3>选择年月</h3>
      <KyDatePicker
        v-model="month"
        title="选择账单月份"
        :columns-type="['year', 'month']"
        :min-date="new Date(2025, 0, 1)"
        :max-date="new Date(2027, 11, 31)"
        @confirm="monthMessage = `已选择 ${formatMonth($event.value)}`"
      />
      <p>{{ monthMessage }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KyDatePicker from '../index';

const date = ref(new Date(2026, 7, 19));
const month = ref(new Date(2026, 7, 1));
const dateMessage = ref('上下拖动选择日期');
const monthMessage = ref('可按业务只展示年、月列');

function formatDate(value: Date) {
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`;
}

function formatMonth(value: Date) {
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}`;
}
</script>

<style scoped lang="less">
.date-picker-demo {
  display: grid;
  gap: var(--ky-space-6);
}

.date-picker-demo section {
  display: grid;
  gap: var(--ky-space-3);
}

.date-picker-demo h3,
.date-picker-demo p {
  margin: 0;
}

.date-picker-demo h3 {
  font-size: var(--ky-font-size-body-strong);
}

.date-picker-demo p {
  color: var(--ky-color-text-secondary);
  text-align: center;
}
</style>
