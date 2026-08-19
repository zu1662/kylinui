<template>
  <KyPicker
    class="ky-time-picker"
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
  TimePickerChangePayload,
  TimePickerColumnType,
  TimePickerConfirmPayload,
  TimePickerOption,
  TimePickerParts,
  TimePickerProps,
} from './time-picker';
import {
  formatTimePickerValue,
  normalizeTimePickerColumnTypes,
  parseTimePickerValue,
  timePickerPartsToSeconds,
  timePickerSecondsToParts,
} from './time-picker';

defineOptions({ name: 'KyTimePicker' });
const props = withDefaults(defineProps<TimePickerProps>(), {
  modelValue: '',
  minTime: '00:00:00',
  maxTime: '23:59:59',
  columnsType: () => ['hour', 'minute'],
  hourStep: 1,
  minuteStep: 1,
  secondStep: 1,
  title: '选择时间',
  itemHeight: 44,
  visibleItemCount: 5,
  swipeDuration: 300,
  confirmText: '确认',
  cancelText: '取消',
  showToolbar: true,
  disabled: false,
  ariaLabel: '时间选择器',
});
const emit = defineEmits<{
  'update:modelValue': [value: string];
  change: [payload: TimePickerChangePayload];
  confirm: [payload: TimePickerConfirmPayload];
  cancel: [];
}>();

const columnTypes = computed(() => normalizeTimePickerColumnTypes(props.columnsType));
const steps = computed<Record<TimePickerColumnType, number>>(() => ({
  hour: normalizeStep(props.hourStep, 23),
  minute: normalizeStep(props.minuteStep, 59),
  second: normalizeStep(props.secondStep, 59),
}));
const bounds = computed(() => {
  const min = timePickerPartsToSeconds(
    parseTimePickerValue(props.minTime) ?? { hour: 0, minute: 0, second: 0 },
  );
  const candidateMax = timePickerPartsToSeconds(
    parseTimePickerValue(props.maxTime) ?? { hour: 23, minute: 59, second: 59 },
  );
  return { min, max: Math.max(min, candidateMax) };
});

function normalizeStep(value: number, max: number) {
  return Math.min(max, Math.max(1, Math.round(value)));
}

function steppedRange(start: number, end: number, step: number) {
  const values = Array.from(
    { length: Math.max(0, end - start + 1) },
    (_, index) => start + index,
  ).filter((value) => value % step === 0);
  return values.length ? values : [start];
}

function nearestValue(values: number[], target: number) {
  return values.reduce((nearest, value) =>
    Math.abs(value - target) < Math.abs(nearest - target) ? value : nearest,
  );
}

function rangeFor(type: TimePickerColumnType, parts: TimePickerParts) {
  const min = timePickerSecondsToParts(bounds.value.min);
  const max = timePickerSecondsToParts(bounds.value.max);
  if (type === 'hour') return steppedRange(min.hour, max.hour, steps.value.hour);
  if (type === 'minute') {
    const start = parts.hour === min.hour ? min.minute : 0;
    const end = parts.hour === max.hour ? max.minute : 59;
    return steppedRange(start, end, steps.value.minute);
  }
  const atMinMinute = parts.hour === min.hour && parts.minute === min.minute;
  const atMaxMinute = parts.hour === max.hour && parts.minute === max.minute;
  return steppedRange(
    atMinMinute ? min.second : 0,
    atMaxMinute ? max.second : 59,
    steps.value.second,
  );
}

function snapTime(value: number) {
  const clamped = Math.min(bounds.value.max, Math.max(bounds.value.min, value));
  const parts = timePickerSecondsToParts(clamped);
  parts.hour = nearestValue(rangeFor('hour', parts), parts.hour);
  parts.minute = nearestValue(rangeFor('minute', parts), parts.minute);
  parts.second = nearestValue(rangeFor('second', parts), parts.second);
  return Math.min(bounds.value.max, Math.max(bounds.value.min, timePickerPartsToSeconds(parts)));
}

function normalizeValue(value: string) {
  const parsed = parseTimePickerValue(value);
  if (parsed) return snapTime(timePickerPartsToSeconds(parsed));
  const now = new Date();
  return snapTime(
    timePickerPartsToSeconds({
      hour: now.getHours(),
      minute: now.getMinutes(),
      second: now.getSeconds(),
    }),
  );
}

const selectedSeconds = ref(normalizeValue(props.modelValue));
const selectedParts = computed(() => timePickerSecondsToParts(selectedSeconds.value));

function selectedPart(type: TimePickerColumnType, parts = selectedParts.value) {
  return parts[type];
}

function defaultText(type: TimePickerColumnType, value: number) {
  const unit = type === 'hour' ? '时' : type === 'minute' ? '分' : '秒';
  return `${String(value).padStart(2, '0')}${unit}`;
}

function createOption(type: TimePickerColumnType, value: number): TimePickerOption {
  return {
    type,
    value,
    text: props.formatter?.(type, value) ?? defaultText(type, value),
  };
}

const columns = computed<TimePickerOption[][]>(() =>
  columnTypes.value.map((type) =>
    rangeFor(type, selectedParts.value).map((value) => createOption(type, value)),
  ),
);
const pickerValues = computed<TimePickerOption[]>(() =>
  columnTypes.value.map((type) => createOption(type, selectedPart(type))),
);
const formattedValue = computed(() =>
  formatTimePickerValue(selectedParts.value, columnTypes.value.includes('second')),
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
  const parts = { ...selectedParts.value };
  values.forEach((option, index) => {
    const type = columnTypes.value[index];
    if (type) parts[type] = optionValue(option);
  });
  return snapTime(timePickerPartsToSeconds(parts));
}

function createPayload(selectedIndexes: number[]): TimePickerConfirmPayload {
  return {
    value: formattedValue.value,
    selectedValues: columnTypes.value.map((type) => selectedPart(type)),
    selectedIndexes: [...selectedIndexes],
  };
}

function handleChange(payload: PickerChangePayload) {
  selectedSeconds.value = valueFromPicker(payload.values);
  emit('update:modelValue', formattedValue.value);
  emit('change', {
    ...createPayload(payload.indexes),
    columnType: columnTypes.value[payload.columnIndex] ?? 'minute',
  });
}

function handleConfirm(payload: Omit<PickerChangePayload, 'columnIndex'>) {
  selectedSeconds.value = valueFromPicker(payload.values);
  emit('confirm', createPayload(payload.indexes));
}

watch(
  [
    () => props.modelValue,
    () => props.minTime,
    () => props.maxTime,
    () => props.hourStep,
    () => props.minuteStep,
    () => props.secondStep,
  ],
  () => {
    selectedSeconds.value = normalizeValue(props.modelValue);
  },
);

defineExpose({ getSelectedTime: () => formattedValue.value });
</script>
