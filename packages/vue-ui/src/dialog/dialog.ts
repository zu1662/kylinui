import type { CSSProperties } from 'vue';
import type { PopupAnimation, PopupDuration } from '../popup/popup';

export interface DialogProps {
  modelValue?: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  enableFooter?: boolean;
  danger?: boolean;
  loading?: boolean;
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
  zIndex?: number | string;
  /** 默认按 center 位置使用 zoom，可传入 Popup 支持的其他动画。 */
  animation?: PopupAnimation | (string & {});
  duration?: number | PopupDuration;
  boxStyle?: CSSProperties;
}

export interface DialogServiceOptions extends Omit<DialogProps, 'modelValue' | 'loading'> {
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
}
