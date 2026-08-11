export type CellContent = string | number;
export type CellSize = 'normal' | 'large';
export type CellArrowDirection = 'up' | 'down' | 'left' | 'right';

export interface CellGroupProps {
  title?: string;
  inset?: boolean;
  border?: boolean;
}

export interface CellProps {
  title?: CellContent;
  value?: CellContent;
  label?: CellContent;
  icon?: string;
  size?: CellSize;
  border?: boolean;
  center?: boolean;
  clickable?: boolean | null;
  isLink?: boolean;
  arrowDirection?: CellArrowDirection;
  required?: boolean;
  disabled?: boolean;
}
