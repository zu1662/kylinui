export type IconXSize = number | string;

export interface IconXProps {
  name: string;
  size?: IconXSize;
  color?: string;
  rotate?: number;
  spin?: boolean;
  label?: string;
}

/** 数字尺寸按 px 输出，字符串尺寸保留调用方提供的 CSS 单位。 */
export function resolveIconXSize(size: IconXSize) {
  return typeof size === 'number' ? `${size}px` : size;
}
