import { reactive } from 'vue';

export type ToastType = 'text' | 'success' | 'error' | 'loading';
export type ToastPosition = 'top' | 'center' | 'bottom';

export interface ToastOptions {
  message: string | number;
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
  zIndex?: number | string;
  forbidClick?: boolean;
  onClose?: () => void;
}

export const toastState = reactive({
  visible: false,
  message: '',
  type: 'text' as ToastType,
  position: 'bottom' as ToastPosition,
  zIndex: 1000 as number | string,
  forbidClick: false,
});
let timer: ReturnType<typeof setTimeout> | undefined;
let closeCallback: (() => void) | undefined;

// 新消息会覆盖当前 Toast，并重置定时器与关闭回调。
export function showToast(options: string | number | ToastOptions) {
  const normalized: ToastOptions =
    typeof options === 'object' ? options : { message: options };
  if (timer) clearTimeout(timer);

  toastState.message = String(normalized.message);
  toastState.type = normalized.type ?? 'text';
  toastState.position = normalized.position ?? 'bottom';
  toastState.zIndex = normalized.zIndex ?? 1000;
  toastState.forbidClick = normalized.forbidClick ?? false;
  closeCallback = normalized.onClose;
  toastState.visible = true;

  const duration =
    normalized.duration ??
    (toastState.type === 'loading' ? 0 : toastState.type === 'error' ? 3200 : 2000);
  if (duration > 0) timer = setTimeout(hideToast, duration);
  return { close: hideToast };
}

export function showLoading(options: string | number | Omit<ToastOptions, 'type'> = '加载中') {
  const normalized = typeof options === 'object' ? options : { message: options };
  return showToast({ ...normalized, type: 'loading', duration: normalized.duration ?? 0 });
}

export function hideToast() {
  const callback = closeCallback;
  toastState.visible = false;
  toastState.forbidClick = false;
  closeCallback = undefined;
  if (timer) clearTimeout(timer);
  timer = undefined;
  callback?.();
}

/** 提供适合 setup 中使用的轻量 Hook 接口。 */
export function useToast() {
  return { show: showToast, loading: showLoading, hide: hideToast };
}
