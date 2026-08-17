import Radio from './radio.vue';
import RadioGroup from './radio-group.vue';
import { withInstall } from '../shared/with-install';
export const KyRadio = withInstall(Radio, 'KyRadio');
export const KyRadioGroup = withInstall(RadioGroup, 'KyRadioGroup');
export default KyRadio;
export type { RadioGroupDirection, RadioGroupProps, RadioProps, RadioValue } from './radio';
