<template>
  <div class="calendar-usage">
    <KyCalendar
      v-bind="calendarProps"
      :default-date="selected"
      :min-date="minDate"
      :max-date="maxDate"
      :poppable="false"
      @select="selected = $event"
      @confirm="confirmed = formatValue($event)"
    />
    <p>已确认：{{ confirmed }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import KyCalendar from '../index';
import type { CalendarValue } from '../calendar';

const props = defineProps<{ configProps: Record<string, unknown> }>();
const today = new Date();
const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);
const selected = ref<CalendarValue>(null);
const confirmed = ref('尚未确认');
const calendarProps = computed(() => ({ ...props.configProps, poppable: false }));

function formatValue(value: Exclude<CalendarValue, null>) {
  const dates = Array.isArray(value) ? value : [value];
  return dates.map((date) => `${date.getMonth() + 1}/${date.getDate()}`).join(' - ');
}
</script>

<style scoped lang="less">
.calendar-usage {
  display: grid;
  gap: var(--ky-space-3);
}

.calendar-usage p {
  margin: 0;
  color: var(--ky-color-text-secondary);
  text-align: center;
}
</style>
