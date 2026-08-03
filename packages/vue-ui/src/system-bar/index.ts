import SystemBar from './system-bar.vue';
import { withInstall } from '../shared/with-install';
export const KySystemBar = withInstall(SystemBar, 'KySystemBar');
export default KySystemBar;
export type { SystemBarProps } from './system-bar';
