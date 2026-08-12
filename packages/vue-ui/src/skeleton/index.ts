import Skeleton from './skeleton.vue';
import { withInstall } from '../shared/with-install';
export const KySkeleton = withInstall(Skeleton, 'KySkeleton');
export default KySkeleton;
export type { SkeletonAvatarShape, SkeletonProps, SkeletonSize } from './skeleton';
