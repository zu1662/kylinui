import type { InputEnterKeyHint, InputMode } from '../input/input';

export interface TextareaAutosizeOptions {
  minRows?: number;
  maxRows?: number;
}

export type TextareaAutosize = boolean | TextareaAutosizeOptions;

export interface TextareaProps {
  modelValue?: string;
  label?: string;
  placeholder?: string;
  helper?: string;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  name?: string;
  id?: string;
  ariaLabel?: string;
  rows?: number;
  maxLength?: number;
  minLength?: number;
  inputMode?: InputMode;
  autoComplete?: string;
  enterKeyHint?: InputEnterKeyHint;
  autofocus?: boolean;
  showWordLimit?: boolean;
  autosize?: TextareaAutosize;
}
