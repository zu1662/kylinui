import PasswordInput from './password-input.vue';
import { withInstall } from '../shared/with-install';

export const KyPasswordInput = withInstall(PasswordInput, 'KyPasswordInput');
export default PasswordInput;
export type { PasswordInputProps, PasswordInputType, PasswordInputVariant } from './password-input';
