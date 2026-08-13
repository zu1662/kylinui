<template>
  <div class="calendar-demo">
    <section>
      <h3>基础用法</h3>
      <KyCellGroup inset>
        <KyCell
          title="选择单个日期"
          :value="formatFullDate(values.single)"
          is-link
          @click="open('single')"
        />
        <KyCell
          title="选择多个日期"
          :value="formatMultiple(values.multiple)"
          is-link
          @click="open('multiple')"
        />
        <KyCell
          title="选择日期区间"
          :value="formatRange(values.range)"
          is-link
          @click="open('range')"
        />
      </KyCellGroup>
    </section>

    <section>
      <h3>快捷选择</h3>
      <KyCellGroup inset>
        <KyCell
          title="选择单个日期"
          :value="formatFullDate(values.quickSingle)"
          is-link
          @click="open('quickSingle')"
        />
        <KyCell
          title="选择日期区间"
          :value="formatRange(values.quickRange)"
          is-link
          @click="open('quickRange')"
        />
      </KyCellGroup>
    </section>

    <section>
      <h3>自定义日历</h3>
      <KyCellGroup inset>
        <KyCell
          title="自定义日期范围"
          :value="formatFullDate(values.customRange)"
          is-link
          @click="open('customRange')"
        />
        <KyCell
          title="自定义按钮文字"
          :value="formatRange(values.customConfirm)"
          is-link
          @click="open('customConfirm')"
        />
        <KyCell
          title="自定义日期文案"
          :value="formatRange(values.customDayText)"
          is-link
          @click="open('customDayText')"
        />
        <KyCell
          title="自定义弹出位置"
          :value="formatFullDate(values.customPosition)"
          is-link
          @click="open('customPosition')"
        />
        <KyCell
          title="日期区间最大范围"
          :value="formatRange(values.maxRange)"
          is-link
          @click="open('maxRange')"
        />
        <KyCell title="自定义周起始日" value="周一" is-link @click="open('firstDayOfWeek')" />
      </KyCellGroup>
    </section>

    <KyCalendar
      v-model:show="showCalendar"
      :type="settings.type"
      :min-date="settings.minDate"
      :max-date="settings.maxDate"
      :max-range="settings.maxRange"
      :formatter="settings.formatter"
      :show-confirm="settings.showConfirm"
      :confirm-text="settings.confirmText"
      :confirm-disabled-text="settings.confirmDisabledText"
      :position="settings.position"
      :round="settings.round"
      :first-day-of-week="settings.firstDayOfWeek"
      :switch-mode="settings.switchMode"
      @confirm="handleConfirm"
      @over-range="rangeMessage = `最多选择 ${$event.maxRange} 天`"
    />
    <p v-if="rangeMessage" class="calendar-demo__message">{{ rangeMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { KyCell, KyCellGroup } from '../../cell';
import KyCalendar from '../index';
import type {
  CalendarDayItem,
  CalendarFormatter,
  CalendarPosition,
  CalendarSwitchMode,
  CalendarType,
  CalendarValue,
} from '../calendar';

type DemoKey =
  | 'single'
  | 'multiple'
  | 'range'
  | 'quickSingle'
  | 'quickRange'
  | 'customRange'
  | 'customConfirm'
  | 'customDayText'
  | 'customPosition'
  | 'maxRange'
  | 'firstDayOfWeek';
interface DemoSettings {
  type: CalendarType;
  minDate: Date;
  maxDate: Date;
  maxRange?: number;
  formatter?: CalendarFormatter;
  showConfirm: boolean;
  confirmText: string;
  confirmDisabledText: string;
  position: CalendarPosition;
  round: boolean;
  firstDayOfWeek: number;
  switchMode: CalendarSwitchMode;
}

const today = new Date();
const defaultMinDate = new Date(today.getFullYear(), today.getMonth(), 1);
const defaultMaxDate = new Date(today.getFullYear(), today.getMonth() + 3, 0);
const showCalendar = ref(false);
const activeKey = ref<DemoKey>('single');
const rangeMessage = ref('');
const values = reactive<Record<DemoKey, CalendarValue>>({
  single: null,
  multiple: [],
  range: [],
  quickSingle: null,
  quickRange: [],
  customRange: null,
  customConfirm: [],
  customDayText: [],
  customPosition: null,
  maxRange: [],
  firstDayOfWeek: null,
});
const settings = reactive<DemoSettings>(createSettings());

function createSettings(): DemoSettings {
  return {
    type: 'single',
    minDate: defaultMinDate,
    maxDate: defaultMaxDate,
    showConfirm: true,
    confirmText: '确定',
    confirmDisabledText: '请选择日期',
    position: 'bottom',
    round: true,
    firstDayOfWeek: 0,
    switchMode: 'none',
  };
}

function open(key: DemoKey) {
  Object.assign(settings, createSettings());
  settings.maxRange = undefined;
  settings.formatter = undefined;
  activeKey.value = key;
  rangeMessage.value = '';
  if (key === 'multiple') settings.type = 'multiple';
  if (['range', 'quickRange', 'customConfirm', 'customDayText', 'maxRange'].includes(key))
    settings.type = 'range';
  if (key === 'quickSingle' || key === 'quickRange') settings.showConfirm = false;
  if (key === 'customRange') {
    settings.minDate = new Date(today.getFullYear(), today.getMonth(), 1);
    settings.maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    settings.switchMode = 'month';
  }
  if (key === 'customConfirm') {
    settings.confirmText = '完成';
    settings.confirmDisabledText = '请选择结束日期';
  }
  if (key === 'customDayText') settings.formatter = formatDay;
  if (key === 'customPosition') {
    settings.position = 'right';
    settings.round = false;
    settings.switchMode = 'month';
  }
  if (key === 'maxRange') settings.maxRange = 3;
  if (key === 'firstDayOfWeek') {
    settings.firstDayOfWeek = 1;
    settings.switchMode = 'year-month';
  }
  showCalendar.value = true;
}

function formatDay(day: CalendarDayItem) {
  const date = day.date.getDate();
  if (date === 1) day.topInfo = '月初';
  if (date === 15) day.text = '中旬';
  if (day.type === 'start') day.bottomInfo = '入住';
  if (day.type === 'end') day.bottomInfo = '离店';
  return day;
}

function handleConfirm(value: Exclude<CalendarValue, null>) {
  values[activeKey.value] = value;
  rangeMessage.value = '';
}

function formatDate(date: Date) {
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function formatFullDate(value: CalendarValue) {
  const date = value instanceof Date ? value : null;
  return date ? `${date.getFullYear()}/${formatDate(date)}` : '请选择';
}

function formatMultiple(value: CalendarValue) {
  return Array.isArray(value) && value.length ? `已选择 ${value.length} 个日期` : '请选择';
}

function formatRange(value: CalendarValue) {
  return Array.isArray(value) && value.length === 2
    ? `${formatDate(value[0])} - ${formatDate(value[1])}`
    : '请选择';
}
</script>

<style scoped lang="less">
.calendar-demo {
  display: grid;
  gap: var(--ky-space-5);
  padding-block: var(--ky-space-2) var(--ky-space-5);
}

.calendar-demo h3 {
  margin: 0;
  padding: 0 var(--ky-space-4) var(--ky-space-2);
  color: var(--ky-color-text-secondary);
  font-size: var(--ky-font-size-assist);
  font-weight: var(--ky-font-medium);
}

.calendar-demo__message {
  position: fixed;
  right: var(--ky-space-4);
  bottom: var(--ky-space-4);
  z-index: 1000;
  margin: 0;
  padding: var(--ky-space-3) var(--ky-space-4);
  color: var(--ky-color-on-brand);
  background: var(--ky-color-brand-strong);
  border-radius: var(--ky-radius-pill);
  box-shadow: var(--ky-shadow-floating);
}
</style>
