import { createVNode, reactive, render } from 'vue';
import DialogServiceHost from './dialog-service-host.vue';
import type { DialogServiceOptions } from './dialog';

export interface DialogServiceState {
  visible: boolean;
  loading: boolean;
  options: DialogServiceOptions;
}

// 显式标注导出类型，避免声明构建泄漏 Vue 内部解包类型与 csstype 路径。
export const dialogServiceState: DialogServiceState = reactive({
  visible: false,
  loading: false,
  options: {},
});

let hostElement: HTMLDivElement | undefined;

// 命令式调用按需创建单例宿主，不要求业务额外配置 Provider。
function ensureDialogHost() {
  if (typeof document === 'undefined' || hostElement) return;
  hostElement = document.createElement('div');
  hostElement.dataset.kyDialogHost = '';
  document.body.appendChild(hostElement);
  render(createVNode(DialogServiceHost), hostElement);
}

export function showDialog(options: DialogServiceOptions) {
  ensureDialogHost();
  dialogServiceState.options = { ...options };
  dialogServiceState.loading = false;
  dialogServiceState.visible = true;
  return { close: closeDialog };
}

export function showAlert(options: string | DialogServiceOptions) {
  const normalized = typeof options === 'string' ? { description: options } : options;
  return showDialog({ ...normalized, showCancel: false });
}

export function showConfirm(options: string | DialogServiceOptions) {
  const normalized = typeof options === 'string' ? { description: options } : options;
  return showDialog({ ...normalized, showCancel: true });
}

export function closeDialog() {
  dialogServiceState.visible = false;
}

/** 为 Composition API 场景提供稳定的方法集合。 */
export function useDialog() {
  return {
    alert: showAlert,
    confirm: showConfirm,
    open: showDialog,
    close: closeDialog,
  };
}
