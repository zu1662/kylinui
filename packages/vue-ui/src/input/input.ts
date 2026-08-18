export type InputType = 'text' | 'tel' | 'email' | 'password' | 'number' | 'search' | 'url';
export type InputMode =
  'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
export type InputEnterKeyHint = 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
export type InputFormatTrigger = 'onChange' | 'onBlur';
export type InputFormatter = (value: string) => string;

export interface InputProps {
  modelValue?: string | number;
  label?: string;
  placeholder?: string;
  helper?: string;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  clearable?: boolean;
  type?: InputType;
  name?: string;
  id?: string;
  ariaLabel?: string;
  maxLength?: number;
  minLength?: number;
  inputMode?: InputMode;
  autoComplete?: string;
  enterKeyHint?: InputEnterKeyHint;
  autofocus?: boolean;
  showWordLimit?: boolean;
  formatter?: InputFormatter;
  formatTrigger?: InputFormatTrigger;
}
