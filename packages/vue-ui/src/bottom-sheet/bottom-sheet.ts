import type { PopupAnimation, PopupDuration } from '../popup/popup';

export interface BottomSheetProps {
  modelValue?: boolean;
  title?: string;
  closeOnOverlay?: boolean;
  showClose?: boolean;
  height?: string;
  zIndex?: number | string;
  /** 默认按 bottom 位置使用 slide-up，可传入 Popup 支持的其他动画。 */
  animation?: PopupAnimation | (string & {});
  duration?: number | PopupDuration;
}
