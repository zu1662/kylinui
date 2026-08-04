import Dialog from './dialog.vue';
import { withInstall } from '../shared/with-install';

export const KyDialog = withInstall(Dialog, 'KyDialog');
export default KyDialog;
export {
  closeDialog,
  dialogServiceState,
  showAlert,
  showConfirm,
  showDialog,
  useDialog,
} from './service';
export type { DialogProps, DialogServiceOptions } from './dialog';
