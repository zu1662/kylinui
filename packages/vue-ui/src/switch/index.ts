import Switch from './switch.vue';
import { withInstall } from '../shared/with-install';
export const KySwitch = withInstall(Switch, 'KySwitch');
export default KySwitch;
export type { SwitchBeforeChange, SwitchProps, SwitchValue } from './switch';
