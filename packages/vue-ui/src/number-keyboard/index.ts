import NumberKeyboard from './number-keyboard.vue';
import { withInstall } from '../shared/with-install';

export const KyNumberKeyboard = withInstall(NumberKeyboard, 'KyNumberKeyboard');
export default KyNumberKeyboard;
export type {
  NumberKeyboardExtraKey,
  NumberKeyboardKey,
  NumberKeyboardKeyType,
  NumberKeyboardProps,
  NumberKeyboardTheme,
} from './number-keyboard';
