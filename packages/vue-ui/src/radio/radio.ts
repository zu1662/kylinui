import type { InjectionKey } from 'vue';

export type RadioValue = string | number | boolean;
export type RadioGroupDirection = 'horizontal' | 'vertical';

export interface RadioProps {
  modelValue?: RadioValue;
  value: RadioValue;
  label: string;
  name?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  modelValue?: RadioValue;
  name?: string;
  disabled?: boolean;
  direction?: RadioGroupDirection;
  ariaLabel?: string;
}

export interface RadioGroupContext {
  name: () => string;
  disabled: () => boolean;
  isChecked: (value: RadioValue) => boolean;
  select: (value: RadioValue) => void;
}

export const RADIO_GROUP_KEY: InjectionKey<RadioGroupContext> = Symbol('ky-radio-group');
