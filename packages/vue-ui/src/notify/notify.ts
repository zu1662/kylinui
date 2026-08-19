import type { TeleportProps } from 'vue';

export type NotifyType = 'primary' | 'success' | 'warning' | 'danger';
export type NotifyPosition = 'top' | 'bottom';

export interface NotifyProps {
  show?: boolean;
  message?: string | number;
  type?: NotifyType;
  duration?: number;
  position?: NotifyPosition;
  offset?: number | string;
  zIndex?: number | string;
  icon?: string;
  showIcon?: boolean;
  closeable?: boolean;
  closeIcon?: string;
  closeOnClick?: boolean;
  safeAreaInsetTop?: boolean;
  safeAreaInsetBottom?: boolean;
  teleport?: TeleportProps['to'] | false;
  className?: string;
}

export interface NotifyOptions extends Omit<NotifyProps, 'show'> {
  onOpened?: () => void;
  onClose?: () => void;
}

export interface NotifyInstance {
  close: () => void;
  message: string | number;
}
