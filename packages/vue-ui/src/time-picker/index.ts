import TimePicker from './time-picker.vue';
import { withInstall } from '../shared/with-install';

export const KyTimePicker = withInstall(TimePicker, 'KyTimePicker');
export default KyTimePicker;
export type {
  TimePickerChangePayload,
  TimePickerColumnType,
  TimePickerConfirmPayload,
  TimePickerFormatter,
  TimePickerOption,
  TimePickerParts,
  TimePickerProps,
} from './time-picker';
