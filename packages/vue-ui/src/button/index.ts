import Button from './button.vue';
import { withInstall } from '../shared/with-install';
export type { ButtonProps } from './button';
export const KyButton = withInstall(Button, 'KyButton');
export default KyButton;
