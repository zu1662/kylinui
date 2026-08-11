export interface GridProps {
  columnNum?: number;
  gutter?: number | string;
  border?: boolean;
  square?: boolean;
  center?: boolean;
  clickable?: boolean;
}
export interface GridItemProps {
  text?: string;
  icon?: string;
  badge?: string | number;
  dot?: boolean;
  url?: string;
}
