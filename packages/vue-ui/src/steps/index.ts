import Steps from './steps.vue';
import { withInstall } from '../shared/with-install';
export const KySteps = withInstall(Steps, 'KySteps');
export default KySteps;
export type { StepsProps, StepItem, StepStatus } from './steps';
