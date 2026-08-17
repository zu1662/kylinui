export type SwitchValue = string | number | boolean;
export type SwitchBeforeChange = (value: SwitchValue) => boolean | Promise<boolean>;

export interface SwitchProps {
  modelValue?: SwitchValue;
  label: string;
  disabled?: boolean;
  loading?: boolean;
  size?: 'small' | 'medium';
  activeValue?: SwitchValue;
  inactiveValue?: SwitchValue;
  beforeChange?: SwitchBeforeChange;
}
