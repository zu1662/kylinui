import Dialog from './dialog.vue';
import { withInstall } from '../shared/with-install';
export const KyDialog = withInstall(Dialog, 'KyDialog');
export default KyDialog;
export type { DialogProps } from './dialog';
