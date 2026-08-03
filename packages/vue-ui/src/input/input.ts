export interface InputProps {
  modelValue?: string | number;
  label?: string;
  placeholder?: string;
  helper?: string;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  clearable?: boolean;
  type?: 'text' | 'tel' | 'email' | 'password' | 'number';
  name?: string;
}
