import Circle from './circle.vue';
import { withInstall } from '../shared/with-install';
export const KyCircle = withInstall(Circle, 'KyCircle');
export default KyCircle;
export type { CircleProps } from './circle';
