import Space from './space.vue';
import { withInstall } from '../shared/with-install';
export const KySpace = withInstall(Space, 'KySpace');
export default KySpace;
export type { SpaceAlign, SpaceDirection, SpaceProps, SpaceSize } from './space';
