import ActionSheet from './action-sheet.vue';
import { withInstall } from '../shared/with-install';

export const KyActionSheet = withInstall(ActionSheet, 'KyActionSheet');
export default KyActionSheet;
export type { ActionSheetAction, ActionSheetProps, ActionSheetTab } from './action-sheet';
