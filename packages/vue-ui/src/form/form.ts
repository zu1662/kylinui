export type FormModel = Record<string, unknown>;
export type FormValidateTrigger = 'onChange' | 'onBlur' | 'onSubmit';
export type FormRuleTrigger = FormValidateTrigger | FormValidateTrigger[];
export type FormRuleResult = boolean | string | void;

export interface FormRuleContext {
  name: string;
  model: FormModel;
  rule: FormRule;
}

export type FormRuleValidator = (
  value: unknown,
  context: FormRuleContext,
) => FormRuleResult | Promise<FormRuleResult>;

export interface FormRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  message?: string;
  trigger?: FormRuleTrigger;
  validator?: FormRuleValidator;
}

export type FormItemRules = FormRule | FormRule[];
export type FormRules = Record<string, FormItemRules | undefined>;
export type FormValidateStatus = 'idle' | 'validating' | 'success' | 'error';

export interface FormScrollIntoViewOptions {
  behavior?: 'auto' | 'smooth';
  block?: 'start' | 'center' | 'end' | 'nearest';
  inline?: 'start' | 'center' | 'end' | 'nearest';
}

export interface FormValidateError {
  name: string;
  message: string;
}

export interface FormValidateResult {
  valid: boolean;
  errors: FormValidateError[];
  values: FormModel;
}

export type FormSubmitter = (
  values: FormModel,
  result: FormValidateResult,
) => unknown | Promise<unknown>;

export interface FormProps {
  model: FormModel;
  rules?: FormRules;
  validateTrigger?: FormRuleTrigger;
  scrollToError?: boolean;
  focusToError?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  submitter?: FormSubmitter;
}

export interface FormItemProps {
  name?: string;
  label?: string;
  helper?: string;
  rules?: FormItemRules;
  validateTrigger?: FormRuleTrigger;
  required?: boolean;
}

export interface FormExpose {
  validate: (names?: string | string[]) => Promise<FormValidateResult>;
  validateField: (name: string) => Promise<FormValidateResult>;
  resetFields: (names?: string | string[]) => void;
  clearValidate: (names?: string | string[]) => void;
  scrollToField: (name: string, options?: FormScrollIntoViewOptions) => void;
  submit: () => Promise<FormValidateResult>;
}
