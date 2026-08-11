import Badge from './badge.vue';
import { withInstall } from '../shared/with-install';
export const KyBadge = withInstall(Badge, 'KyBadge');
export default KyBadge;
export type { BadgePosition, BadgeProps } from './badge';
