export type GridDirection = 'horizontal' | 'vertical';

export interface GridProps {
  columnNum?: number | string;
  gutter?: number | string;
  border?: boolean;
  square?: boolean;
  center?: boolean;
  clickable?: boolean;
  direction?: GridDirection;
  reverse?: boolean;
  iconSize?: number | string;
}

export interface GridItemProps {
  text?: string;
  icon?: string;
  badge?: string | number;
  dot?: boolean;
  url?: string;
}

export function resolveGridUnit(value?: number | string) {
  if (value === undefined || value === '') return undefined;
  return typeof value === 'number' ? `${value}px` : value;
}

export function resolveGridColumnNum(value: number | string) {
  const columnNum = Number(value);
  return Number.isFinite(columnNum) && columnNum > 0 ? columnNum : 4;
}

export function hasGridGutter(value: number | string) {
  if (typeof value === 'number') return value !== 0;
  const normalizedValue = value.trim().toLowerCase();
  return Boolean(normalizedValue) && !/^0(?:[a-z%]+)?$/.test(normalizedValue);
}
