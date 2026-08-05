import Transition from './transition.vue';
import { withInstall } from '../shared/with-install';

export const KyTransition = withInstall(Transition, 'KyTransition');
export default KyTransition;
export {
  isBuiltInTransitionName,
  resolveTransitionDuration,
  resolveTransitionName,
  transitionDefaultDuration,
  transitionNames,
} from './transition';
export type {
  BuiltInTransitionName,
  TransitionDuration,
  TransitionMode,
  TransitionName,
  TransitionProps,
  TransitionType,
} from './transition';
