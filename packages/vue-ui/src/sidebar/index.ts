import Sidebar from './sidebar.vue';
import SidebarItem from './sidebar-item.vue';
import { withInstall } from '../shared/with-install';
export const KySidebar = withInstall(Sidebar, 'KySidebar');
export const KySidebarItem = withInstall(SidebarItem, 'KySidebarItem');
export default KySidebar;
export type { SidebarItemProps, SidebarName, SidebarProps } from './sidebar';
