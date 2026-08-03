import Toast from './toast.vue';
import { withInstall } from '../shared/with-install';
export const KyToast = withInstall(Toast, 'KyToast');
export default KyToast;
export { showToast, hideToast, toastState } from './toast';
export type { ToastOptions, ToastType } from './toast';
