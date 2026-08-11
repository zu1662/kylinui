import NavBar from './nav-bar.vue';
import { withInstall } from '../shared/with-install';
export const KyNavBar = withInstall(NavBar, 'KyNavBar');
export default KyNavBar;
export type { NavBarBeforeBack, NavBarProps, NavBarTheme } from './nav-bar';
