import Popup from './popup.vue';
import { withInstall } from '../shared/with-install';

export const KyPopup = withInstall(Popup, 'KyPopup');
export default KyPopup;
export type { PopupPosition, PopupProps } from './popup';
