export type IconSize = number | string;
export type IconSource = 'auto' | 'svg' | 'iconfont';

export interface IconProps {
  name: string;
  source?: IconSource;
  size?: IconSize;
  color?: string;
  strokeWidth?: number;
  rotate?: number;
  spin?: boolean;
  label?: string;
}

// 路径使用 24×24 线性图标坐标，避免引入字体文件和额外运行时依赖。
const iconPaths: Record<string, string[]> = {
  'chevron-right': ['M9 5l7 7-7 7'],
  'chevron-left': ['M15 5l-7 7 7 7'],
  'chevron-down': ['M5 9l7 7 7-7'],
  'chevron-up': ['M5 15l7-7 7 7'],
  close: ['M6 6l12 12', 'M18 6L6 18'],
  check: ['M5 12l4 4L19 6'],
  'check-circle': ['M22 11.1V12a10 10 0 1 1-5.9-9.1', 'M22 4L12 14.01l-3-3'],
  circle: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z'],
  info: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M12 10v6', 'M12 7h.01'],
  help: [
    'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z',
    'M9.1 9a3 3 0 1 1 5.8 1c0 2-3 2-3 4',
    'M12 17h.01',
  ],
  plus: ['M12 5v14', 'M5 12h14'],
  calendar: ['M5 3v3', 'M19 3v3', 'M4 8h16', 'M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1z'],
  trash: ['M4 7h16', 'M9 7V4h6v3', 'M7 7l1 13h8l1-13', 'M10 11v5', 'M14 11v5'],
  edit: ['M4 20h4L19 9l-4-4L4 16v4z', 'M13.5 6.5l4 4'],
  copy: ['M8 8h11v12H8z', 'M5 16H4V4h11v1'],
  bell: ['M6 9a6 6 0 0 1 12 0c0 7 3 7 3 8H3c0-1 3-1 3-8', 'M10 21h4'],
  speaker: ['M4 10v4h4l5 4V6L8 10H4z', 'M16 9a4 4 0 0 1 0 6', 'M18 6a8 8 0 0 1 0 12'],
  none: [],
};

/** 返回名称对应的 SVG 路径；未知名称返回空数组，由默认插槽兜底。 */
export function resolveIconPaths(name: string) {
  return iconPaths[name.trim()] ?? [];
}

/** 数字尺寸自动补充 px，字符串尺寸原样保留。 */
export function resolveIconSize(size: IconSize) {
  return typeof size === 'number' ? `${size}px` : size;
}
