import type { CSSProperties } from 'vue';

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
  boxStyle?: CSSProperties;
}

export interface DialogServiceOptions extends Omit<
  DialogProps,
  'modelValue' | 'visible' | 'loading'
> {
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
}
