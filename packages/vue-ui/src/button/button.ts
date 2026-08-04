export type ButtonVariant = 'primary' | 'secondary' | 'text' | 'danger' | 'gradient';
export type ButtonLegacyType = 'default' | 'primary' | 'highlight';
export type ButtonSize = 'large' | 'medium' | 'small' | 'mini';
export type ButtonLegacySize = '' | 'default' | 'big' | 'tiny';
export type ButtonSubtitlePosition = 'bottom' | 'left';

export interface ButtonProps {
  /** 推荐使用的视觉类型。 */
  variant?: ButtonVariant;
  /** 兼容参考项目的 type 属性。 */
  type?: ButtonLegacyType;
  size?: ButtonSize | ButtonLegacySize;
  block?: boolean;
  /** 列表按钮模式，默认占满容器宽度。 */
  list?: boolean;
  plain?: boolean;
  shadow?: boolean;
  loading?: boolean;
  disabled?: boolean;
  subtitle?: string;
  /** 兼容参考项目的副标题属性。 */
  subtext?: string;
  subtitlePosition?: ButtonSubtitlePosition;
  subtextPosition?: ButtonSubtitlePosition;
  icon?: string;
  nativeType?: 'button' | 'submit' | 'reset';
}

export function resolveButtonVariant(variant?: ButtonVariant, legacyType?: ButtonLegacyType) {
  if (variant) return variant;
  if (legacyType === 'default') return 'secondary';
  if (legacyType === 'highlight') return 'gradient';
  return 'primary';
}

export function resolveButtonSize(size?: ButtonSize | ButtonLegacySize): ButtonSize {
  if (size === 'big') return 'large';
  if (size === 'tiny') return 'mini';
  if (!size || size === 'default') return 'medium';
  return size;
}
