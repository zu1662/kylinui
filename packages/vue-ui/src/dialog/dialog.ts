import type { CSSProperties } from 'vue';
import type { PopupAnimation, PopupDuration } from '../popup/popup';

export interface DialogProps {
  modelValue?: boolean;
  /** 兼容参考项目的 visible 双向绑定。 */
  visible?: boolean;
  title?: string;
  description?: string;
  /** 兼容参考项目的正文属性。 */
  content?: string;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  enableFooter?: boolean;
  danger?: boolean;
  loading?: boolean;
  closeOnOverlay?: boolean;
  maskClosable?: boolean;
  closeOnEsc?: boolean;
  zIndex?: number | string;
  /** 默认按 center 位置使用 zoom，可传入 Popup 支持的其他动画。 */
  animation?: PopupAnimation | (string & {});
  duration?: number | PopupDuration;
  boxStyle?: CSSProperties;
}

export interface DialogServiceOptions extends Omit<
  DialogProps,
  'modelValue' | 'visible' | 'loading'
> {
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
}
