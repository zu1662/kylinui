import type { HTMLAttributes, TeleportProps } from 'vue';

export type PopupPosition = 'top' | 'right' | 'bottom' | 'left' | 'center';

/** 与 siskin-next 对齐的内置动画名，也允许传入自定义 Vue Transition 名称。 */
export type PopupAnimation =
  | 'zoom'
  | 'punch'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'fade'
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'post-up'
  | 'none';

export interface PopupDuration {
  enter?: number;
  leave?: number;
}

export interface PopupProps {
  modelValue?: boolean;
  position?: PopupPosition;
  overlay?: boolean;
  closeOnOverlay?: boolean;
  lockScroll?: boolean;
  /** 是否在浏览器或 WebView 系统返回时关闭当前顶层浮层。 */
  closeOnPopstate?: boolean;
  round?: boolean;
  safeArea?: boolean;
  destroyOnClose?: boolean;
  teleport?: TeleportProps['to'] | false;
  zIndex?: number | string;
  /** 内置动画名，或自定义 Vue Transition 名称。 */
  animation?: PopupAnimation | (string & {});
  /** 单个数字表示进出一致，也可分别配置进入和退出时长。 */
  duration?: number | PopupDuration;
  panelClass?: HTMLAttributes['class'];
  role?: 'dialog' | 'alertdialog';
  ariaLabel?: string | null;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
}
