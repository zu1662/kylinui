import type { TeleportProps } from 'vue';
import type { PopupPosition } from '../popup';

export type CalendarType = 'single' | 'range' | 'multiple';
export type CalendarSwitchMode = 'none' | 'month' | 'year-month';
export type CalendarPosition = Exclude<PopupPosition, 'center'>;
export type CalendarDayType =
  | 'normal'
  | 'disabled'
  | 'selected'
  | 'start'
  | 'middle'
  | 'end'
  | 'start-end'
  | 'multiple-selected';

export interface CalendarDayItem {
  date: Date;
  type: CalendarDayType;
  text: string;
  topInfo?: string;
  bottomInfo?: string;
  className?: string;
}

export type CalendarFormatter = (day: CalendarDayItem) => CalendarDayItem;
export type CalendarValue = Date | Date[] | null;

export interface CalendarProps {
  show?: boolean;
  type?: CalendarType;
  title?: string;
  subtitle?: string;
  defaultDate?: CalendarValue;
  minDate?: Date;
  maxDate?: Date;
  maxRange?: number;
  allowSameDay?: boolean;
  showConfirm?: boolean;
  confirmText?: string;
  confirmDisabledText?: string;
  firstDayOfWeek?: number;
  formatter?: CalendarFormatter;
  switchMode?: CalendarSwitchMode;
  showMonthMark?: boolean;
  poppable?: boolean;
  position?: CalendarPosition;
  round?: boolean;
  closeOnOverlay?: boolean;
  teleport?: TeleportProps['to'] | false;
  safeArea?: boolean;
  ariaLabel?: string;
}

export function startOfCalendarDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function toCalendarDateKey(date: Date) {
  const normalized = startOfCalendarDay(date);
  const year = normalized.getFullYear();
  const month = String(normalized.getMonth() + 1).padStart(2, '0');
  const day = String(normalized.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function compareCalendarDates(first: Date, second: Date) {
  return startOfCalendarDay(first).getTime() - startOfCalendarDay(second).getTime();
}

export function clampCalendarDate(date: Date, minDate: Date, maxDate: Date) {
  if (compareCalendarDates(date, minDate) < 0) return startOfCalendarDay(minDate);
  if (compareCalendarDates(date, maxDate) > 0) return startOfCalendarDay(maxDate);
  return startOfCalendarDay(date);
}

export function addCalendarMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

export function getCalendarRangeLength(start: Date, end: Date) {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const startTime = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const endTime = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
  return Math.round((endTime - startTime) / millisecondsPerDay) + 1;
}
