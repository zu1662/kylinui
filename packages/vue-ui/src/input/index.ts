import Input from './input.vue';
import { withInstall } from '../shared/with-install';
export const KyInput = withInstall(Input, 'KyInput');
export default KyInput;
export type {
  InputEnterKeyHint,
  InputFormatter,
  InputFormatTrigger,
  InputMode,
  InputProps,
  InputType,
} from './input';
