import TabBar from './tab-bar.vue';
import { withInstall } from '../shared/with-install';

export const KyTabBar = withInstall(TabBar, 'KyTabBar');
export default KyTabBar;
export type { TabBarItem, TabBarProps, TabBarValue } from './tab-bar';
