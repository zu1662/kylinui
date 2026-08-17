import Checkbox from './checkbox.vue';
import CheckboxGroup from './checkbox-group.vue';
import { withInstall } from '../shared/with-install';
export const KyCheckbox = withInstall(Checkbox, 'KyCheckbox');
export const KyCheckboxGroup = withInstall(CheckboxGroup, 'KyCheckboxGroup');
export default KyCheckbox;
export type {
  CheckboxGroupDirection,
  CheckboxGroupExpose,
  CheckboxGroupProps,
  CheckboxGroupToggleAllOptions,
  CheckboxProps,
  CheckboxValue,
} from './checkbox';
