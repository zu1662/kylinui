export interface CellGroupProps {
  title?: string;
  inset?: boolean;
  border?: boolean;
}
export interface CellProps {
  title?: string;
  value?: string | number;
  label?: string;
  icon?: string;
  size?: 'normal' | 'large';
  border?: boolean;
  center?: boolean;
  clickable?: boolean;
  isLink?: boolean;
  required?: boolean;
  disabled?: boolean;
}
