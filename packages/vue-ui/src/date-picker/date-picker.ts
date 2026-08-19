import type { PickerProps } from '../picker';

export type DatePickerColumnType = 'year' | 'month' | 'day';

export interface DatePickerOption extends Record<string, unknown> {
  text: string;
  value: number;
  type: DatePickerColumnType;
}

export type DatePickerFormatter = (type: DatePickerColumnType, value: number) => string;

export interface DatePickerConfirmPayload {
  value: Date;
  selectedValues: number[];
  selectedIndexes: number[];
}

export interface DatePickerChangePayload extends DatePickerConfirmPayload {
  columnType: DatePickerColumnType;
}

export interface DatePickerProps extends Pick<
  PickerProps,
  | 'title'
  | 'itemHeight'
  | 'visibleItemCount'
  | 'swipeDuration'
  | 'confirmText'
  | 'cancelText'
  | 'showToolbar'
  | 'disabled'
  | 'ariaLabel'
> {
  modelValue?: Date | null;
  minDate?: Date;
  maxDate?: Date;
  columnsType?: DatePickerColumnType[];
  formatter?: DatePickerFormatter;
}

export const DATE_PICKER_COLUMN_TYPES: DatePickerColumnType[] = ['year', 'month', 'day'];

export function isValidDatePickerDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

export function normalizeDatePickerColumnTypes(types: DatePickerColumnType[]) {
  const normalized = DATE_PICKER_COLUMN_TYPES.filter((type) => types.includes(type));
  return normalized.length ? normalized : [...DATE_PICKER_COLUMN_TYPES];
}

export function getDatePickerMonthDays(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

export function clampDatePickerDate(value: Date, minDate: Date, maxDate: Date) {
  const normalized = new Date(value.getFullYear(), value.getMonth(), value.getDate());
  if (normalized.getTime() < minDate.getTime()) return new Date(minDate);
  if (normalized.getTime() > maxDate.getTime()) return new Date(maxDate);
  return normalized;
}
