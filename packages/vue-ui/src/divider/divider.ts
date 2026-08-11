export type DividerPosition = 'left' | 'center' | 'right';
export interface DividerProps {
  dashed?: boolean;
  hairline?: boolean;
  contentPosition?: DividerPosition;
  vertical?: boolean;
}
