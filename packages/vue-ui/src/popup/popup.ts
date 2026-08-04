import type { TeleportProps } from 'vue';

export type PopupPosition = 'top' | 'right' | 'bottom' | 'left' | 'center';

export interface PopupProps {
  /** 推荐使用的双向绑定值。 */
  modelValue?: boolean;
  /** 兼容参考项目的 visible 双向绑定。 */
  visible?: boolean;
  position?: PopupPosition;
  overlay?: boolean;
  closeOnOverlay?: boolean;
  lockScroll?: boolean;
  round?: boolean;
  safeArea?: boolean;
  destroyOnClose?: boolean;
  teleport?: TeleportProps['to'] | false;
  zIndex?: number | string;
  duration?: number;
  ariaLabel?: string;
}
