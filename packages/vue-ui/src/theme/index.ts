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

// 默认参数会在函数调用时立即求值 document.documentElement，服务端渲染无 document 会直接抛错；
// 改为函数体内解析，并在无 DOM 环境安全返回，调用方传入 target 时行为不变。
/** 将主题写入任意 HTML 容器；默认作用于整页，也支持局部主题作用域。 */
export function setKylinTheme(theme: KylinTheme, target?: HTMLElement): KylinTheme {
  if (typeof document === 'undefined') return theme;
  const root = target ?? document.documentElement;
  root.setAttribute(KYLIN_THEME_ATTRIBUTE, theme);
  return theme;
}

/** 读取容器当前主题，无有效值时回退到温润青玉。 */
export function getKylinTheme(target?: HTMLElement): KylinTheme {
  if (typeof document === 'undefined') return 'jade';
  const root = target ?? document.documentElement;
  return resolveKylinTheme(root.getAttribute(KYLIN_THEME_ATTRIBUTE));
}
