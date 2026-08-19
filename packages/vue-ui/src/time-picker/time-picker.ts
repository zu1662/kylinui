import type { PickerProps } from '../picker';

export type TimePickerColumnType = 'hour' | 'minute' | 'second';

export interface TimePickerOption extends Record<string, unknown> {
  text: string;
  value: number;
  type: TimePickerColumnType;
}

export type TimePickerFormatter = (type: TimePickerColumnType, value: number) => string;

export interface TimePickerConfirmPayload {
  value: string;
  selectedValues: number[];
  selectedIndexes: number[];
}

export interface TimePickerChangePayload extends TimePickerConfirmPayload {
  columnType: TimePickerColumnType;
}

export interface TimePickerProps extends Pick<
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
  modelValue?: string;
  minTime?: string;
  maxTime?: string;
  columnsType?: TimePickerColumnType[];
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  formatter?: TimePickerFormatter;
}

export interface TimePickerParts {
  hour: number;
  minute: number;
  second: number;
}

export const TIME_PICKER_COLUMN_TYPES: TimePickerColumnType[] = ['hour', 'minute', 'second'];

export function normalizeTimePickerColumnTypes(
  types: TimePickerColumnType[],
): TimePickerColumnType[] {
  const normalized = TIME_PICKER_COLUMN_TYPES.filter((type) => types.includes(type));
  return normalized.length ? normalized : ['hour', 'minute'];
}

export function parseTimePickerValue(value: string | undefined): TimePickerParts | null {
  const match = /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/.exec(value ?? '');
  if (!match) return null;
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  const second = Number(match[3] ?? 0);
  if (hour > 23 || minute > 59 || second > 59) return null;
  return { hour, minute, second };
}

export function timePickerPartsToSeconds(parts: TimePickerParts) {
  return parts.hour * 3600 + parts.minute * 60 + parts.second;
}

export function timePickerSecondsToParts(value: number): TimePickerParts {
  const seconds = Math.min(86399, Math.max(0, Math.round(value)));
  return {
    hour: Math.floor(seconds / 3600),
    minute: Math.floor((seconds % 3600) / 60),
    second: seconds % 60,
  };
}

export function formatTimePickerValue(parts: TimePickerParts, showSecond = false) {
  const values = [parts.hour, parts.minute, ...(showSecond ? [parts.second] : [])];
  return values.map((value) => String(value).padStart(2, '0')).join(':');
}
