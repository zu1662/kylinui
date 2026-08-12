export type StickyPosition = 'top' | 'bottom';
export interface StickyProps {
  position?: StickyPosition;
  offset?: number | string;
  zIndex?: number;
}
