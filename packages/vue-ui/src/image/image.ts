import type { ImgHTMLAttributes } from 'vue';
import type { ImagePreviewSource } from '../image-preview';

export type ImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
export interface ImageProps {
  src?: string;
  srcset?: string;
  sizes?: string;
  alt?: string;
  fit?: ImageFit;
  position?: string;
  width?: number | string;
  height?: number | string;
  radius?: number | string;
  round?: boolean;
  block?: boolean;
  lazy?: boolean;
  lazyRoot?: string | Element | null;
  lazyRootMargin?: string;
  retry?: number;
  retryDelay?: number;
  preview?: boolean;
  previewImages?: readonly ImagePreviewSource[];
  previewStartPosition?: number;
  showLoading?: boolean;
  showError?: boolean;
  crossorigin?: ImgHTMLAttributes['crossorigin'];
  referrerpolicy?: ImgHTMLAttributes['referrerpolicy'];
  decoding?: ImgHTMLAttributes['decoding'];
}
export const resolveImageSize = (value?: number | string) =>
  typeof value === 'number' ? value + 'px' : value;
