export type ButtonVariant = 'primary' | 'secondary' | 'text' | 'danger' | 'gradient';
export type ButtonSize = 'large' | 'medium' | 'small' | 'mini';
export type ButtonSubtitlePosition = 'bottom' | 'left';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  /** 列表按钮模式，默认占满容器宽度。 */
  list?: boolean;
  plain?: boolean;
  shadow?: boolean;
  loading?: boolean;
  disabled?: boolean;
  subtitle?: string;
  subtitlePosition?: ButtonSubtitlePosition;
  icon?: string;
  nativeType?: 'button' | 'submit' | 'reset';
}

export function resolveButtonVariant(variant?: ButtonVariant): ButtonVariant {
  return variant ?? 'primary';
}

export function resolveButtonSize(size?: ButtonSize): ButtonSize {
  return size ?? 'medium';
}
