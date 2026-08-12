import Sticky from './sticky.vue';
import { withInstall } from '../shared/with-install';
export const KySticky = withInstall(Sticky, 'KySticky');
export default KySticky;
export type { StickyPosition, StickyProps } from './sticky';
