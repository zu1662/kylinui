import CountDown from './count-down.vue';
import { withInstall } from '../shared/with-install';
export const KyCountDown = withInstall(CountDown, 'KyCountDown');
export default KyCountDown;
export type { CountDownCurrent, CountDownProps } from './count-down';
