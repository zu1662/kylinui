export type SpaceDirection = 'horizontal' | 'vertical';
export type SpaceAlign = 'start' | 'center' | 'end' | 'baseline';
export type SpaceSize =
  'mini' | 'small' | 'medium' | 'large' | number | string | [number | string, number | string];
export interface SpaceProps {
  direction?: SpaceDirection;
  size?: SpaceSize;
  align?: SpaceAlign;
  wrap?: boolean;
  fill?: boolean;
}
