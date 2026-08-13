import type { App } from 'vue';
import Toast from './toast.vue';
import { withInstall } from '../shared/with-install';
import { mountToastHost } from './service';

export const KyToast = withInstall(Toast, 'KyToast');
const registerToast = KyToast.install;

KyToast.install = (app: App) => {
  registerToast(app);
  mountToastHost();
};

export default KyToast;
export {
  allowMultipleToast,
  closeToast,
  hideToast,
  resetToastDefaultOptions,
  setToastDefaultOptions,
  showFailToast,
  showLoading,
  showLoadingToast,
  showSuccessToast,
  showToast,
  useToast,
} from './service';
export { toastState } from './toast';
export type {
  ToastInstance,
  ToastOptions,
  ToastPosition,
  ToastProps,
  ToastState,
  ToastType,
  ToastWordBreak,
} from './toast';
