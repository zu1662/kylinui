export type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
export interface BadgeProps {
  content?: string | number;
  max?: number;
  dot?: boolean;
  showZero?: boolean;
  position?: BadgePosition;
  color?: string;
  offset?: [number | string, number | string];
}
