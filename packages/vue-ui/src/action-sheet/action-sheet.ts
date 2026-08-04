import type { CSSProperties } from 'vue';
import type { PopupAnimation, PopupDuration } from '../popup/popup';

export interface ActionSheetAction {
  name: string;
  value?: string | number;
  description?: string;
  color?: string;
  disabled?: boolean;
  loading?: boolean;
  danger?: boolean;
}

export interface ActionSheetTab {
  title: string | number;
  subTitle?: string | number;
}

export interface ActionSheetProps {
  modelValue?: boolean;
  visible?: boolean;
  title?: string | number;
  actions?: ActionSheetAction[];
  showClose?: boolean;
  closeIcon?: boolean;
  closeOnOverlay?: boolean;
  maskClosable?: boolean;
  closeOnSwipe?: boolean;
  overlay?: boolean;
  hasMask?: boolean;
  cancelText?: string;
  confirmText?: string;
  zIndex?: number | string;
  /** 默认按 bottom 位置使用 slide-up，可传入 Popup 支持的其他动画。 */
  animation?: PopupAnimation | (string & {});
  duration?: number | PopupDuration;
  maxHeight?: string;
  height?: string;
  heightFixed?: boolean;
  heightFixedValue?: number;
  contentStyle?: CSSProperties;
  tabs?: ActionSheetTab[] | Array<string | number>;
  tabArea?: ActionSheetTab[] | Array<string | number>;
  activeTab?: number;
  safeArea?: boolean;
}
