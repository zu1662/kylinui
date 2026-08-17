import type { InjectionKey } from 'vue';

export type CheckboxValue = string | number;
export type CheckboxGroupDirection = 'horizontal' | 'vertical';

export interface CheckboxProps {
  modelValue?: boolean;
  value?: CheckboxValue;
  label: string;
  name?: string;
  disabled?: boolean;
  indeterminate?: boolean;
}

export interface CheckboxGroupProps {
  modelValue?: CheckboxValue[];
  disabled?: boolean;
  direction?: CheckboxGroupDirection;
  max?: number;
  name?: string;
  ariaLabel?: string;
}

export interface CheckboxGroupToggleAllOptions {
  checked?: boolean;
}

export interface CheckboxGroupExpose {
  toggleAll: (options?: CheckboxGroupToggleAllOptions) => void;
}

export interface CheckboxGroupContext {
  name: () => string | undefined;
  disabled: () => boolean;
  isChecked: (value: CheckboxValue) => boolean;
  toggle: (value: CheckboxValue, checked: boolean) => boolean;
  register: (value: CheckboxValue, disabled: () => boolean) => void;
  unregister: (value: CheckboxValue) => void;
}

export const CHECKBOX_GROUP_KEY: InjectionKey<CheckboxGroupContext> = Symbol('ky-checkbox-group');
