export type PickerPrimitive = string | number;
export type PickerOption = PickerPrimitive | Record<string, unknown>;
export type PickerColumn = PickerOption[];

export interface PickerFieldNames {
  text?: string;
  value?: string;
  children?: string;
}

export interface PickerChangePayload {
  values: PickerOption[];
  indexes: number[];
  columnIndex: number;
}

export interface PickerProps {
  modelValue?: PickerOption[];
  columns: PickerColumn | PickerColumn[];
  title?: string;
  defaultIndex?: number | number[];
  columnsFieldNames?: PickerFieldNames;
  itemHeight?: number;
  visibleItemCount?: number;
  swipeDuration?: number;
  confirmText?: string;
  cancelText?: string;
  showToolbar?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
}

export function clampPickerIndex(index: number, length: number) {
  return Math.min(Math.max(0, Math.round(index)), Math.max(0, length - 1));
}
