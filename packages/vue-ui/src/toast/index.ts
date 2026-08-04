import { createVNode, render, type App } from 'vue';
import Toast from './toast.vue';
import { withInstall } from '../shared/with-install';

export const KyToast = withInstall(Toast, 'KyToast');
const registerToast = KyToast.install;
let hostElement: HTMLDivElement | undefined;

// 安装 Toast 时创建应用级单例宿主，业务无需在每个页面重复挂载。
KyToast.install = (app: App) => {
  registerToast(app);
  if (typeof document === 'undefined' || hostElement) return;
  hostElement = document.createElement('div');
  hostElement.dataset.kyToastHost = '';
  document.body.appendChild(hostElement);
  render(createVNode(Toast), hostElement);
};

export default KyToast;
export { hideToast, showLoading, showToast, toastState, useToast } from './toast';
export type { ToastOptions, ToastPosition, ToastType } from './toast';
