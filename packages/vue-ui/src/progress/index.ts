import Progress from './progress.vue';
import { withInstall } from '../shared/with-install';
export const KyProgress = withInstall(Progress, 'KyProgress');
export default KyProgress;
export type { ProgressProps } from './progress';
