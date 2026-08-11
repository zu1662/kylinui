export const KYLIN_THEMES = ['jade', 'ocean', 'sunset', 'midnight'] as const;

export type KylinTheme = (typeof KYLIN_THEMES)[number];

export interface KylinThemeOption {
  value: KylinTheme;
  label: string;
  description: string;
}

export const KYLIN_THEME_OPTIONS: readonly KylinThemeOption[] = [
  { value: 'jade', label: '温润青玉', description: '自然、温和的青绿品牌主题' },
  { value: 'ocean', label: '海盐蓝', description: '清爽、理性的蓝色效率主题' },
  { value: 'sunset', label: '暖杏丹霞', description: '柔和、活泼的暖色生活主题' },
  { value: 'midnight', label: '星夜紫', description: '沉浸、高对比的深色主题' },
];

export const KYLIN_THEME_ATTRIBUTE = 'data-ky-theme';

export function isKylinTheme(value: unknown): value is KylinTheme {
  return typeof value === 'string' && KYLIN_THEMES.includes(value as KylinTheme);
}

export function resolveKylinTheme(value: unknown, fallback: KylinTheme = 'jade'): KylinTheme {
  return isKylinTheme(value) ? value : fallback;
}

/** 将主题写入任意 HTML 容器；默认作用于整页，也支持局部主题作用域。 */
export function setKylinTheme(
  theme: KylinTheme,
  target: HTMLElement = document.documentElement,
): KylinTheme {
  target.setAttribute(KYLIN_THEME_ATTRIBUTE, theme);
  return theme;
}

/** 读取容器当前主题，无有效值时回退到温润青玉。 */
export function getKylinTheme(target: HTMLElement = document.documentElement): KylinTheme {
  return resolveKylinTheme(target.getAttribute(KYLIN_THEME_ATTRIBUTE));
}
