import type { ImgHTMLAttributes } from 'vue';
export type ImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
export interface ImageProps {
  src?: string;
  alt?: string;
  fit?: ImageFit;
  position?: string;
  width?: number | string;
  height?: number | string;
  radius?: number | string;
  round?: boolean;
  block?: boolean;
  lazy?: boolean;
  showLoading?: boolean;
  showError?: boolean;
  crossorigin?: ImgHTMLAttributes['crossorigin'];
  referrerpolicy?: ImgHTMLAttributes['referrerpolicy'];
  decoding?: ImgHTMLAttributes['decoding'];
}
export const resolveImageSize = (value?: number | string) =>
  typeof value === 'number' ? `${value}px` : value;
