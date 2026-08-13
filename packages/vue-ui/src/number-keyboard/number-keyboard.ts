import type { TeleportProps } from 'vue';

export type NumberKeyboardTheme = 'default' | 'custom';
export type NumberKeyboardExtraKey = string | string[];
export type NumberKeyboardKeyType = 'digit' | 'extra' | 'delete';

export interface NumberKeyboardKey {
  id: string;
  type: NumberKeyboardKeyType;
  text: string;
  ariaLabel: string;
  span?: number;
}

export interface NumberKeyboardProps {
  modelValue?: string;
  visible?: boolean;
  title?: string;
  theme?: NumberKeyboardTheme;
  extraKey?: NumberKeyboardExtraKey;
  closeText?: string;
  deleteText?: string;
  maxlength?: number;
  randomKeyOrder?: boolean;
  showDeleteKey?: boolean;
  hideOnClickOutside?: boolean;
  safeArea?: boolean;
  teleport?: TeleportProps['to'] | false;
  zIndex?: number | string;
  disabled?: boolean;
  ariaLabel?: string;
}
