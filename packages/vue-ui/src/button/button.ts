export type ButtonVariant = 'primary' | 'secondary' | 'text' | 'danger' | 'gradient';
export type ButtonSize = 'large' | 'medium' | 'small' | 'mini';
export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
  subtitle?: string;
  nativeType?: 'button' | 'submit' | 'reset';
}
