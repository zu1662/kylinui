import Picker from './picker.vue';
import { withInstall } from '../shared/with-install';

export const KyPicker = withInstall(Picker, 'KyPicker');
export default KyPicker;
export type {
  PickerChangePayload,
  PickerColumn,
  PickerFieldNames,
  PickerOption,
  PickerPrimitive,
  PickerProps,
} from './picker';
