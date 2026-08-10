export type IconXSize = number | string;

export interface IconXProps {
  /** 图标名称，支持 `loading` 与 `icon-loading` 两种写法。 */
  name: string;
  size?: IconXSize;
  color?: string;
  rotate?: number;
  spin?: boolean;
  label?: string;
}

/** 去掉来源 Iconfont 的类名前缀，统一使用组件自己的命名空间。 */
export function normalizeIconXName(name: string) {
  return name.trim().replace(/^icon-/, '');
}

/** 数字尺寸按 px 输出，字符串尺寸保留调用方提供的 CSS 单位。 */
export function resolveIconXSize(size: IconXSize) {
  return typeof size === 'number' ? `${size}px` : size;
}
