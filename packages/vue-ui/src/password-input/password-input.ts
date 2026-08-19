export type PasswordInputType = 'number' | 'text';
export type PasswordInputVariant = 'joined' | 'separated';

export interface PasswordInputProps {
  modelValue?: string;
  length?: number;
  type?: PasswordInputType;
  mask?: boolean;
  variant?: PasswordInputVariant;
  focused?: boolean;
  showCursor?: boolean;
  info?: string;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  name?: string;
  id?: string;
  ariaLabel?: string;
  autoComplete?: string;
  autofocus?: boolean;
}
