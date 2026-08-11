import CountDown from './count-down.vue';
import { withInstall } from '../shared/with-install';

export const KyCountDown = withInstall(CountDown, 'KyCountDown');
export default KyCountDown;
export type {
  CountDownCurrent,
  CountDownCurrentTime,
  CountDownExpose,
  CountDownInstance,
  CountDownProps,
  CountDownTime,
} from './count-down';
