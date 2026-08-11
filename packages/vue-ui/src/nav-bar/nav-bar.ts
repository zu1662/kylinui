export type NavBarTheme = 'light' | 'dark' | 'gradient';

export type NavBarBeforeBack = () => boolean | void | Promise<boolean | void>;

export interface NavBarProps {
  title?: string;
  leftText?: string;
  rightText?: string;
  leftArrow?: boolean;
  /** @deprecated 请使用 leftArrow。 */
  showBack?: boolean;
  safeAreaInsetTop?: boolean;
  /** @deprecated 请使用 safeAreaInsetTop。 */
  safeTop?: boolean;
  theme?: NavBarTheme;
  sticky?: boolean;
  fixed?: boolean;
  placeholder?: boolean;
  zIndex?: number | string;
  beforeBack?: NavBarBeforeBack;
}
