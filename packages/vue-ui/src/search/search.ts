import type {
  InputEnterKeyHint,
  InputFormatTrigger,
  InputFormatter,
  InputMode,
} from '../input/input';

export type SearchShape = 'square' | 'round';
export interface SearchSuggestion {
  value: string;
  label?: string;
  disabled?: boolean;
}

export interface SearchProps {
  modelValue?: string;
  label?: string;
  placeholder?: string;
  shape?: SearchShape;
  name?: string;
  maxLength?: number;
  /** @deprecated 请使用 maxLength。 */
  maxlength?: number;
  inputMode?: InputMode;
  autoComplete?: string;
  enterKeyHint?: InputEnterKeyHint;
  formatter?: InputFormatter;
  formatTrigger?: InputFormatTrigger;
  clearable?: boolean;
  showAction?: boolean;
  actionText?: string;
  loading?: boolean;
  suggestions?: readonly SearchSuggestion[];
  showSuggestions?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  autofocus?: boolean;
}
