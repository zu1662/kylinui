import { reactive, type TeleportProps } from 'vue';
import type { LoadingType } from '../loading';
import type { IconSize } from '../icon';

export type ToastType = 'text' | 'success' | 'error' | 'fail' | 'loading';
export type ToastPosition = 'top' | 'center' | 'middle' | 'bottom';
export type ToastWordBreak = 'break-all' | 'break-word' | 'normal';

export interface ToastProps {
  show?: boolean;
  message?: string | number;
  type?: ToastType;
  icon?: string;
  iconSize?: IconSize;
  loadingType?: LoadingType;
  duration?: number;
  position?: ToastPosition;
  wordBreak?: ToastWordBreak;
  zIndex?: number | string;
  forbidClick?: boolean;
  overlay?: boolean;
  closeOnClick?: boolean;
  teleport?: TeleportProps['to'];
  className?: string;
}

export interface ToastOptions extends Omit<ToastProps, 'show'> {
  onOpened?: () => void;
  onClose?: () => void;
}

export interface ToastInstance {
  close: () => void;
  message: string | number;
}

export interface ToastState {
  visible: boolean;
  message: string;
  type: ToastType;
  position: ToastPosition;
  zIndex: number | string;
  forbidClick: boolean;
}

/** 兼容旧版读取方式；多实例模式下始终反映最后打开的 Toast。 */
export const toastState = reactive<ToastState>({
  visible: false,
  message: '',
  type: 'text',
  position: 'bottom',
  zIndex: 1000,
  forbidClick: false,
});
