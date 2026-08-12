import Tabs from './tabs.vue';
import Tab from './tab.vue';
import { withInstall } from '../shared/with-install';
export const KyTabs = withInstall(Tabs, 'KyTabs');
export const KyTab = withInstall(Tab, 'KyTab');
export default KyTabs;
export type { TabName, TabProps, TabsProps, TabsType } from './tabs';
