import DatePicker from './date-picker.vue';
import { withInstall } from '../shared/with-install';

export const KyDatePicker = withInstall(DatePicker, 'KyDatePicker');
export default KyDatePicker;
export type {
  DatePickerChangePayload,
  DatePickerColumnType,
  DatePickerConfirmPayload,
  DatePickerFormatter,
  DatePickerOption,
  DatePickerProps,
} from './date-picker';
