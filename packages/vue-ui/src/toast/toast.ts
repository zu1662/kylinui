import { reactive } from 'vue';

export type ToastType = 'text' | 'success' | 'error' | 'loading';
export interface ToastOptions {
  message: string;
  type?: ToastType;
  duration?: number;
}

export const toastState = reactive({ visible: false, message: '', type: 'text' as ToastType });
let timer: ReturnType<typeof setTimeout> | undefined;

// 全局只维护一个 Toast，新消息会替换旧消息并重置关闭计时。
export function showToast(options: string | ToastOptions) {
  const normalized = typeof options === 'string' ? { message: options } : options;
  if (timer) clearTimeout(timer);
  toastState.message = normalized.message;
  toastState.type = normalized.type ?? 'text';
  toastState.visible = true;
  if (toastState.type !== 'loading') {
    const duration = normalized.duration ?? (toastState.type === 'error' ? 3200 : 2000);
    timer = setTimeout(hideToast, duration);
  }
}

export function hideToast() {
  toastState.visible = false;
  if (timer) clearTimeout(timer);
  timer = undefined;
}
