import type { App } from 'vue';
import { withInstall } from '../shared/with-install';
import Notify from './notify.vue';
import { mountNotifyHost } from './service';

export const KyNotify = withInstall(Notify, 'KyNotify');
const registerNotify = KyNotify.install;

KyNotify.install = (app: App) => {
  registerNotify(app);
  mountNotifyHost();
};

export default KyNotify;
export {
  closeNotify,
  resetNotifyDefaultOptions,
  setNotifyDefaultOptions,
  showDangerNotify,
  showNotify,
  showPrimaryNotify,
  showSuccessNotify,
  showWarningNotify,
  useNotify,
} from './service';
export type {
  NotifyInstance,
  NotifyOptions,
  NotifyPosition,
  NotifyProps,
  NotifyType,
} from './notify';
