export type BackTopTarget = string | HTMLElement | Window;
export interface BackTopProps {
  target?: BackTopTarget;
  right?: number | string;
  bottom?: number | string;
  offset?: number;
  duration?: number;
  zIndex?: number;
}
