<template>
  <KyPicker
    class="ky-date-picker"
    :model-value="pickerValues"
    :columns="columns"
    :title="title"
    :item-height="itemHeight"
    :visible-item-count="visibleItemCount"
    :swipe-duration="swipeDuration"
    :confirm-text="confirmText"
    :cancel-text="cancelText"
    :show-toolbar="showToolbar"
    :disabled="disabled"
    :aria-label="ariaLabel"
    @change="handleChange"
    @confirm="handleConfirm"
    @cancel="emit('cancel')"
  >
    <template #option="{ option, index, columnIndex }">
      <slot
        name="option"
        :option="option"
        :index="index"
        :column-index="columnIndex"
        :column-type="columnTypes[columnIndex]"
      >
        {{ getOptionText(option) }}
      </slot>
    </template>
  </KyPicker>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { KyPicker } from '../picker';
import type { PickerChangePayload, PickerOption } from '../picker';
import type {
  DatePickerChangePayload,
  DatePickerColumnType,
  DatePickerConfirmPayload,
  DatePickerOption,
  DatePickerProps,
} from './date-picker';
import {
  clampDatePickerDate,
  getDatePickerMonthDays,
  isValidDatePickerDate,
  normalizeDatePickerColumnTypes,
} from './date-picker';

defineOptions({ name: 'KyDatePicker' });
const props = withDefaults(defineProps<DatePickerProps>(), {
  modelValue: null,
  columnsType: () => ['year', 'month', 'day'],
  title: '选择日期',
  itemHeight: 44,
  visibleItemCount: 5,
  swipeDuration: 300,
  confirmText: '确认',
  cancelText: '取消',
  showToolbar: true,
  disabled: false,
  ariaLabel: '日期选择器',
});
const emit = defineEmits<{
  'update:modelValue': [value: Date];
  change: [payload: DatePickerChangePayload];
  confirm: [payload: DatePickerConfirmPayload];
  cancel: [];
}>();

function defaultMinDate() {
  const today = new Date();
  return new Date(today.getFullYear() - 10, 0, 1);
}

function defaultMaxDate() {
  const today = new Date();
  return new Date(today.getFullYear() + 10, 11, 31);
}

const bounds = computed(() => {
  const minDate = isValidDatePickerDate(props.minDate)
    ? new Date(props.minDate.getFullYear(), props.minDate.getMonth(), props.minDate.getDate())
    : defaultMinDate();
  const candidateMax = isValidDatePickerDate(props.maxDate)
    ? new Date(props.maxDate.getFullYear(), props.maxDate.getMonth(), props.maxDate.getDate())
    : defaultMaxDate();
  return {
    minDate,
    maxDate: candidateMax.getTime() < minDate.getTime() ? new Date(minDate) : candidateMax,
  };
});

function normalizeValue(value: Date | null | undefined) {
  const fallback = isValidDatePickerDate(value) ? value : new Date();
  return clampDatePickerDate(fallback, bounds.value.minDate, bounds.value.maxDate);
}

const selectedDate = ref(normalizeValue(props.modelValue));
const columnTypes = computed(() => normalizeDatePickerColumnTypes(props.columnsType));

function selectedPart(type: DatePickerColumnType, date = selectedDate.value) {
  if (type === 'year') return date.getFullYear();
  if (type === 'month') return date.getMonth() + 1;
  return date.getDate();
}

function defaultText(type: DatePickerColumnType, value: number) {
  if (type === 'year') return `${value}年`;
  return `${String(value).padStart(2, '0')}${type === 'month' ? '月' : '日'}`;
}

function createOption(type: DatePickerColumnType, value: number): DatePickerOption {
  return {
    type,
    value,
    text: props.formatter?.(type, value) ?? defaultText(type, value),
  };
}

function createRange(start: number, end: number, type: DatePickerColumnType) {
  return Array.from({ length: Math.max(0, end - start + 1) }, (_, index) =>
    createOption(type, start + index),
  );
}

const columns = computed<DatePickerOption[][]>(() =>
  columnTypes.value.map((type) => {
    const year = selectedDate.value.getFullYear();
    const month = selectedDate.value.getMonth() + 1;
    const minDate = bounds.value.minDate;
    const maxDate = bounds.value.maxDate;

    if (type === 'year') return createRange(minDate.getFullYear(), maxDate.getFullYear(), type);
    if (type === 'month') {
      const start = year === minDate.getFullYear() ? minDate.getMonth() + 1 : 1;
      const end = year === maxDate.getFullYear() ? maxDate.getMonth() + 1 : 12;
      return createRange(start, end, type);
    }

    const start =
      year === minDate.getFullYear() && month === minDate.getMonth() + 1 ? minDate.getDate() : 1;
    const naturalEnd = getDatePickerMonthDays(year, month);
    const end =
      year === maxDate.getFullYear() && month === maxDate.getMonth() + 1
        ? Math.min(naturalEnd, maxDate.getDate())
        : naturalEnd;
    return createRange(start, end, type);
  }),
);

const pickerValues = computed<DatePickerOption[]>(() =>
  columnTypes.value.map((type) => createOption(type, selectedPart(type))),
);

function optionValue(option: PickerOption) {
  if (typeof option !== 'object') return Number(option);
  return Number(option.value);
}

function getOptionText(option: PickerOption) {
  if (typeof option !== 'object') return String(option);
  return String(option.text ?? option.value ?? '');
}

function valueFromPicker(values: PickerOption[]) {
  const parts = {
    year: selectedDate.value.getFullYear(),
    month: selectedDate.value.getMonth() + 1,
    day: selectedDate.value.getDate(),
  };

  values.forEach((option, index) => {
    const type = columnTypes.value[index];
    if (type) parts[type] = optionValue(option);
  });

  const day = Math.min(parts.day, getDatePickerMonthDays(parts.year, parts.month));
  return clampDatePickerDate(
    new Date(parts.year, parts.month - 1, day),
    bounds.value.minDate,
    bounds.value.maxDate,
  );
}

function createPayload(selectedIndexes: number[]): DatePickerConfirmPayload {
  return {
    value: new Date(selectedDate.value),
    selectedValues: columnTypes.value.map((type) => selectedPart(type)),
    selectedIndexes: [...selectedIndexes],
  };
}

function handleChange(payload: PickerChangePayload) {
  selectedDate.value = valueFromPicker(payload.values);
  const nextValue = new Date(selectedDate.value);
  emit('update:modelValue', nextValue);
  emit('change', {
    ...createPayload(payload.indexes),
    columnType: columnTypes.value[payload.columnIndex] ?? 'day',
  });
}

function handleConfirm(payload: Omit<PickerChangePayload, 'columnIndex'>) {
  selectedDate.value = valueFromPicker(payload.values);
  emit('confirm', createPayload(payload.indexes));
}

watch(
  [
    () => props.modelValue?.getTime(),
    () => props.minDate?.getTime(),
    () => props.maxDate?.getTime(),
  ],
  () => {
    selectedDate.value = normalizeValue(props.modelValue);
  },
);

defineExpose({ getSelectedDate: () => new Date(selectedDate.value) });
</script>
