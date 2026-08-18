<template>
  <component :is="poppable ? KyPopup : 'div'" v-bind="popupBindings">
    <section
      class="ky-calendar"
      :class="[
        `ky-calendar--${position}`,
        {
          'ky-calendar--inline': !poppable,
          'has-confirm': showConfirm,
        },
      ]"
      :role="!poppable ? 'region' : undefined"
      :aria-label="!poppable ? ariaLabel : undefined"
    >
      <header class="ky-calendar__header">
        <button
          v-if="poppable"
          class="ky-calendar__close"
          type="button"
          aria-label="关闭日历"
          @click="closeCalendar"
        >
          <KyIcon name="close" />
        </button>
        <h2 class="ky-calendar__title">{{ title }}</h2>
        <p v-if="resolvedSubtitle" class="ky-calendar__subtitle">{{ resolvedSubtitle }}</p>

        <nav v-if="switchMode !== 'none'" class="ky-calendar__switcher" aria-label="月份切换">
          <button
            v-if="switchMode === 'year-month'"
            class="ky-calendar__year-button ky-calendar__year-button--previous"
            type="button"
            aria-label="上一年"
            :disabled="!canGoPreviousYear"
            @click="moveMonth(-12)"
          >
            ‹‹
          </button>
          <button
            class="ky-calendar__month-button ky-calendar__month-button--previous"
            type="button"
            aria-label="上一个月"
            :disabled="!canGoPrevious"
            @click="moveMonth(-1)"
          >
            <KyIcon name="chevron-left" />
          </button>
          <strong>{{ formatMonth(displayMonth) }}</strong>
          <button
            class="ky-calendar__month-button ky-calendar__month-button--next"
            type="button"
            aria-label="下一个月"
            :disabled="!canGoNext"
            @click="moveMonth(1)"
          >
            <KyIcon name="chevron-right" />
          </button>
          <button
            v-if="switchMode === 'year-month'"
            class="ky-calendar__year-button ky-calendar__year-button--next"
            type="button"
            aria-label="下一年"
            :disabled="!canGoNextYear"
            @click="moveMonth(12)"
          >
            ››
          </button>
        </nav>

        <div class="ky-calendar__weekdays" role="row">
          <span v-for="weekday in weekdays" :key="weekday" role="columnheader">{{ weekday }}</span>
        </div>
      </header>

      <div ref="body" class="ky-calendar__body">
        <section
          v-for="month in visibleMonths"
          :key="month.key"
          class="ky-calendar__month"
          :aria-label="month.label"
        >
          <h3 v-if="switchMode === 'none'" class="ky-calendar__month-title">{{ month.label }}</h3>
          <div class="ky-calendar__days" role="grid">
            <span v-if="showMonthMark" class="ky-calendar__month-mark" aria-hidden="true">
              {{ month.monthNumber }}
            </span>
            <span
              v-for="index in month.offset"
              :key="`placeholder-${month.key}-${index}`"
              class="ky-calendar__placeholder"
              aria-hidden="true"
            />
            <button
              v-for="day in month.days"
              :key="toCalendarDateKey(day.date)"
              type="button"
              role="gridcell"
              class="ky-calendar__day"
              :class="[
                `ky-calendar__day--${day.type}`,
                day.className,
                {
                  'is-today': isToday(day.date),
                  'is-weekend': isWeekend(day.date),
                },
              ]"
              :tabindex="day.type === 'disabled' ? -1 : 0"
              :aria-disabled="day.type === 'disabled' ? 'true' : undefined"
              :aria-selected="isDaySelected(day.type)"
              :aria-label="dayAriaLabel(day)"
              @click="selectDay(day)"
            >
              <span v-if="day.topInfo" class="ky-calendar__top-info">{{ day.topInfo }}</span>
              <span class="ky-calendar__day-text">{{ day.text }}</span>
              <span v-if="day.bottomInfo" class="ky-calendar__bottom-info">{{
                day.bottomInfo
              }}</span>
            </button>
          </div>
        </section>
      </div>

      <footer v-if="showConfirm" class="ky-calendar__footer">
        <KyButton block :disabled="!canConfirm" @click="confirmSelection">
          {{ canConfirm ? confirmText : confirmDisabledText }}
        </KyButton>
      </footer>
    </section>
  </component>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import KyButton from '../button';
import KyIcon from '../icon';
import KyPopup from '../popup';
import { showToast } from '../toast';
import type { CalendarDayItem, CalendarProps, CalendarValue } from './calendar';
import {
  addCalendarMonths,
  clampCalendarDate,
  compareCalendarDates,
  getCalendarRangeLength,
  startOfCalendarDay,
  toCalendarDateKey,
} from './calendar';

defineOptions({ name: 'KyCalendar' });
const props = withDefaults(defineProps<CalendarProps>(), {
  show: false,
  type: 'single',
  title: '日期选择',
  subtitle: '',
  defaultDate: null,
  minDate: () => startOfCalendarDay(new Date()),
  maxDate: () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth() + 6, today.getDate());
  },
  maxRange: undefined,
  allowSameDay: false,
  showConfirm: true,
  confirmText: '确定',
  confirmDisabledText: '请选择日期',
  firstDayOfWeek: 0,
  formatter: undefined,
  switchMode: 'none',
  showMonthMark: true,
  poppable: true,
  position: 'bottom',
  round: true,
  closeOnOverlay: true,
  teleport: undefined,
  safeArea: true,
  ariaLabel: '日期选择日历',
});
const emit = defineEmits<{
  'update:show': [value: boolean];
  confirm: [value: Exclude<CalendarValue, null>];
  select: [value: Exclude<CalendarValue, null>];
  unselect: [date: Date];
  overRange: [payload: { start: Date; end: Date; maxRange: number }];
  clickDisabledDate: [date: Date];
  monthChange: [date: Date];
  close: [];
  closed: [];
}>();

const body = ref<HTMLElement>();
const selected = ref<CalendarValue>(normalizeValue(props.defaultDate));
const displayMonth = ref(initialMonth());
// switchMode=none 时按月分批渲染，避免日期范围较大时一次性创建全部月份 DOM 阻塞首次打开。
const MONTH_BATCH_SIZE = 3;
const renderedMonthCount = ref(MONTH_BATCH_SIZE);
const normalizedMinDate = computed(() => startOfCalendarDay(props.minDate));
const normalizedMaxDate = computed(() => {
  const max = startOfCalendarDay(props.maxDate);
  return compareCalendarDates(max, normalizedMinDate.value) < 0 ? normalizedMinDate.value : max;
});
const firstWeekday = computed(() => ((Math.round(props.firstDayOfWeek) % 7) + 7) % 7);
const weekdays = computed(() => {
  const labels = ['日', '一', '二', '三', '四', '五', '六'];
  return Array.from({ length: 7 }, (_, index) => labels[(firstWeekday.value + index) % 7]);
});
const resolvedSubtitle = computed(
  () => props.subtitle || (props.switchMode === 'none' ? '' : formatMonth(displayMonth.value)),
);
const canConfirm = computed(() => {
  if (props.type === 'single') return selected.value instanceof Date;
  if (!Array.isArray(selected.value)) return false;
  if (props.type === 'range') return selected.value.length === 2;
  return selected.value.length > 0;
});
const popupBindings = computed(() =>
  props.poppable
    ? {
        modelValue: props.show,
        position: props.position,
        round: props.round,
        closeOnOverlay: props.closeOnOverlay,
        teleport: props.teleport,
        safeArea: props.safeArea,
        panelClass: 'ky-calendar__popup-panel',
        ariaLabel: props.ariaLabel,
        'onUpdate:modelValue': updateShow,
        onClose: handlePopupClose,
        onClosed: () => emit('closed'),
      }
    : {},
);
const visibleMonths = computed(() => {
  if (props.switchMode !== 'none') return [buildMonth(displayMonth.value)];
  const months = [];
  let cursor = new Date(
    normalizedMinDate.value.getFullYear(),
    normalizedMinDate.value.getMonth(),
    1,
  );
  const end = new Date(
    normalizedMaxDate.value.getFullYear(),
    normalizedMaxDate.value.getMonth(),
    1,
  );
  let count = 0;
  while (compareCalendarDates(cursor, end) <= 0 && count < renderedMonthCount.value) {
    months.push(buildMonth(cursor));
    cursor = addCalendarMonths(cursor, 1);
    count += 1;
  }
  return months;
});
const totalMonthCount = computed(() => {
  if (props.switchMode !== 'none') return 1;
  const start = normalizedMinDate.value;
  const end = normalizedMaxDate.value;
  return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
});
const canGoPrevious = computed(() => canMoveTo(addCalendarMonths(displayMonth.value, -1)));
const canGoNext = computed(() => canMoveTo(addCalendarMonths(displayMonth.value, 1)));
const canGoPreviousYear = computed(() => canMoveTo(addCalendarMonths(displayMonth.value, -12)));
const canGoNextYear = computed(() => canMoveTo(addCalendarMonths(displayMonth.value, 12)));

watch(
  () => props.defaultDate,
  (value) => {
    selected.value = normalizeValue(value);
    displayMonth.value = initialMonth();
    renderedMonthCount.value = MONTH_BATCH_SIZE;
  },
  { deep: true },
);
watch(
  () => [props.minDate.getTime(), props.maxDate.getTime(), props.type],
  () => {
    selected.value = normalizeValue(selected.value);
    displayMonth.value = initialMonth();
    renderedMonthCount.value = MONTH_BATCH_SIZE;
  },
);
watch(
  () => props.show,
  (show) => {
    if (!show) return;
    selected.value = normalizeValue(props.defaultDate);
    displayMonth.value = initialMonth();
    renderedMonthCount.value = MONTH_BATCH_SIZE;
  },
);

// 滚动接近底部时追加下一批月份；追加后内容可能仍未填满容器，需要主动复查一次。
function handleBodyScroll() {
  const element = body.value;
  if (!element || renderedMonthCount.value >= totalMonthCount.value) return;
  if (element.scrollTop + element.clientHeight >= element.scrollHeight - 200) {
    renderedMonthCount.value = Math.min(
      renderedMonthCount.value + MONTH_BATCH_SIZE,
      totalMonthCount.value,
    );
    void nextTick(handleBodyScroll);
  }
}

let detachBodyScroll: (() => void) | undefined;
watch(
  body,
  (element) => {
    detachBodyScroll?.();
    detachBodyScroll = undefined;
    if (!element) return;
    element.addEventListener('scroll', handleBodyScroll, { passive: true });
    detachBodyScroll = () => element.removeEventListener('scroll', handleBodyScroll);
    void nextTick(handleBodyScroll);
  },
  { flush: 'post' },
);
onBeforeUnmount(() => detachBodyScroll?.());

function normalizeValue(value: CalendarValue): CalendarValue {
  const min = startOfCalendarDay(props.minDate);
  const maxCandidate = startOfCalendarDay(props.maxDate);
  const max = compareCalendarDates(maxCandidate, min) < 0 ? min : maxCandidate;
  if (value instanceof Date) return clampCalendarDate(value, min, max);
  if (!Array.isArray(value)) return props.type === 'multiple' || props.type === 'range' ? [] : null;
  const dates = value
    .filter((date): date is Date => date instanceof Date && !Number.isNaN(date.getTime()))
    .map((date) => clampCalendarDate(date, min, max))
    .sort(compareCalendarDates);
  if (props.type === 'single') return dates[0] ?? null;
  if (props.type === 'range') return dates.slice(0, 2);
  return Array.from(new Map(dates.map((date) => [toCalendarDateKey(date), date])).values());
}

function initialMonth() {
  const value = selected.value;
  const date = value instanceof Date ? value : Array.isArray(value) ? value[0] : props.minDate;
  const clamped = clampCalendarDate(date || props.minDate, props.minDate, props.maxDate);
  return new Date(clamped.getFullYear(), clamped.getMonth(), 1);
}

function buildMonth(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDate = new Date(year, month, 1);
  const offset = (firstDate.getDay() - firstWeekday.value + 7) % 7;
  const dayCount = new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: dayCount }, (_, index) =>
    buildDay(new Date(year, month, index + 1)),
  );
  return {
    key: `${year}-${month + 1}`,
    label: formatMonth(firstDate),
    monthNumber: month + 1,
    offset,
    days,
  };
}

function buildDay(date: Date): CalendarDayItem {
  const disabled =
    compareCalendarDates(date, normalizedMinDate.value) < 0 ||
    compareCalendarDates(date, normalizedMaxDate.value) > 0;
  let type: CalendarDayItem['type'] = disabled ? 'disabled' : resolveSelectionType(date);
  const day: CalendarDayItem = { date, type, text: String(date.getDate()) };
  return props.formatter ? props.formatter({ ...day, date: new Date(day.date) }) : day;
}

function resolveSelectionType(date: Date): CalendarDayItem['type'] {
  if (selected.value instanceof Date)
    return isSameDay(date, selected.value) ? 'selected' : 'normal';
  if (!Array.isArray(selected.value) || selected.value.length === 0) return 'normal';
  if (props.type === 'multiple')
    return includesDate(selected.value, date) ? 'multiple-selected' : 'normal';
  const [start, end] = selected.value;
  if (!start) return 'normal';
  if (isSameDay(date, start) && end && isSameDay(start, end)) return 'start-end';
  if (isSameDay(date, start)) return 'start';
  if (end && isSameDay(date, end)) return 'end';
  if (end && compareCalendarDates(date, start) > 0 && compareCalendarDates(date, end) < 0)
    return 'middle';
  return 'normal';
}

function selectDay(day: CalendarDayItem) {
  if (day.type === 'disabled') {
    emit('clickDisabledDate', day.date);
    return;
  }
  const date = startOfCalendarDay(day.date);
  if (props.type === 'single') selected.value = date;
  else if (props.type === 'multiple') toggleMultipleDate(date);
  else selectRangeDate(date);
  const value = cloneCalendarValue(selected.value);
  if (value) emit('select', value);
  if (!props.showConfirm && selectionComplete()) confirmSelection();
}

function toggleMultipleDate(date: Date) {
  const dates = Array.isArray(selected.value) ? [...selected.value] : [];
  const index = dates.findIndex((item) => isSameDay(item, date));
  if (index >= 0) {
    const [removed] = dates.splice(index, 1);
    emit('unselect', removed);
  } else {
    dates.push(date);
    dates.sort(compareCalendarDates);
  }
  selected.value = dates;
}

function selectRangeDate(date: Date) {
  const dates = Array.isArray(selected.value) ? [...selected.value] : [];
  if (dates.length !== 1 || compareCalendarDates(date, dates[0]) < 0) {
    selected.value = [date];
    return;
  }
  const start = dates[0];
  if (!props.allowSameDay && isSameDay(start, date)) return;
  if (props.maxRange && getCalendarRangeLength(start, date) > props.maxRange) {
    showToast({
      message: `最多选择 ${props.maxRange} 天`,
      position: 'center',
    });
    emit('overRange', { start, end: date, maxRange: props.maxRange });
    return;
  }
  selected.value = [start, date];
}

function confirmSelection() {
  if (!canConfirm.value) return;
  const value = cloneCalendarValue(selected.value);
  if (!value) return;
  emit('confirm', value);
  updateShow(false);
}

function selectionComplete() {
  if (props.type === 'single') return selected.value instanceof Date;
  if (props.type === 'range') return Array.isArray(selected.value) && selected.value.length === 2;
  return Array.isArray(selected.value) && selected.value.length > 0;
}

function cloneCalendarValue(value: CalendarValue): Exclude<CalendarValue, null> | null {
  if (value instanceof Date) return new Date(value);
  if (Array.isArray(value)) return value.map((date) => new Date(date));
  return null;
}

function moveMonth(amount: number) {
  const next = addCalendarMonths(displayMonth.value, amount);
  if (!canMoveTo(next)) return;
  displayMonth.value = next;
  emit('monthChange', new Date(next));
  body.value?.scrollTo({ top: 0, behavior: 'smooth' });
}

function canMoveTo(date: Date) {
  const target = date.getFullYear() * 12 + date.getMonth();
  const min = normalizedMinDate.value.getFullYear() * 12 + normalizedMinDate.value.getMonth();
  const max = normalizedMaxDate.value.getFullYear() * 12 + normalizedMaxDate.value.getMonth();
  return target >= min && target <= max;
}

function updateShow(value: boolean) {
  if (value !== props.show) emit('update:show', value);
}

function closeCalendar() {
  updateShow(false);
}

function handlePopupClose() {
  emit('close');
}

function isSameDay(first: Date, second: Date) {
  return toCalendarDateKey(first) === toCalendarDateKey(second);
}

function includesDate(dates: Date[], target: Date) {
  return dates.some((date) => isSameDay(date, target));
}

function formatMonth(date: Date) {
  return `${date.getFullYear()} 年 ${date.getMonth() + 1} 月`;
}

function isToday(date: Date) {
  return isSameDay(date, new Date());
}

function isWeekend(date: Date) {
  return date.getDay() === 0 || date.getDay() === 6;
}

function isDaySelected(type: CalendarDayItem['type']) {
  return ['selected', 'start', 'middle', 'end', 'start-end', 'multiple-selected'].includes(type);
}

function dayAriaLabel(day: CalendarDayItem) {
  const dateText = `${day.date.getFullYear()} 年 ${day.date.getMonth() + 1} 月 ${day.date.getDate()} 日`;
  const state = day.type === 'disabled' ? '，不可选择' : isDaySelected(day.type) ? '，已选择' : '';
  return `${dateText}${state}`;
}
</script>
