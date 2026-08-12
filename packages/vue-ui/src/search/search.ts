export type SearchShape = 'square' | 'round';
export interface SearchProps {
  modelValue?: string;
  label?: string;
  placeholder?: string;
  shape?: SearchShape;
  name?: string;
  maxlength?: number;
  clearable?: boolean;
  showAction?: boolean;
  actionText?: string;
  disabled?: boolean;
  readonly?: boolean;
  autofocus?: boolean;
}
