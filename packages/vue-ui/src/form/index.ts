import Form from './form.vue';
import FormItem from './form-item.vue';
import { withInstall } from '../shared/with-install';

export const KyForm = withInstall(Form, 'KyForm');
export const KyFormItem = withInstall(FormItem, 'KyFormItem');
export default KyForm;

export type {
  FormExpose,
  FormItemProps,
  FormItemRules,
  FormModel,
  FormProps,
  FormRule,
  FormRuleContext,
  FormRules,
  FormRuleTrigger,
  FormRuleValidator,
  FormScrollIntoViewOptions,
  FormSubmitter,
  FormValidateError,
  FormValidateResult,
  FormValidateStatus,
  FormValidateTrigger,
} from './form';
