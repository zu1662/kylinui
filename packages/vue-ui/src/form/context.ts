import type { ComputedRef, InjectionKey } from 'vue';
import type {
  FormModel,
  FormRuleTrigger,
  FormRules,
  FormScrollIntoViewOptions,
  FormValidateError,
  FormValidateTrigger,
} from './form';

export interface RegisteredFormField {
  id: symbol;
  name: ComputedRef<string | undefined>;
  validate: (trigger?: FormValidateTrigger) => Promise<FormValidateError | undefined>;
  reset: () => void;
  clearValidate: () => void;
  focus: () => void;
  scrollIntoView: (options?: FormScrollIntoViewOptions) => void;
}

export interface FormContext {
  model: ComputedRef<FormModel>;
  rules: ComputedRef<FormRules>;
  validateTrigger: ComputedRef<FormRuleTrigger>;
  disabled: ComputedRef<boolean>;
  readonly: ComputedRef<boolean>;
  registerField: (field: RegisteredFormField) => void;
  unregisterField: (field: RegisteredFormField) => void;
  emitValidate: (name: string, valid: boolean, message?: string) => void;
}

export interface FormItemContext {
  controlId: string;
  messageId: string;
  errorMessage: ComputedRef<string>;
  hasMessage: ComputedRef<boolean>;
  required: ComputedRef<boolean>;
  disabled: ComputedRef<boolean>;
  readonly: ComputedRef<boolean>;
}

export const FORM_KEY: InjectionKey<FormContext> = Symbol('ky-form');
export const FORM_ITEM_KEY: InjectionKey<FormItemContext> = Symbol('ky-form-item');
