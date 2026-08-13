import type { ComponentPublicInstance, TeleportProps } from 'vue';

export interface ImagePreviewItem {
  src: string;
  alt?: string;
  caption?: string;
  [key: string]: unknown;
}

export type ImagePreviewSource = string | ImagePreviewItem;

export interface ImagePreviewProps {
  modelValue?: boolean;
  images?: ImagePreviewSource[];
  startPosition?: number;
  loop?: boolean;
  showIndex?: boolean;
  showArrows?: boolean;
  closeable?: boolean;
  closeOnClickOverlay?: boolean;
  closeOnEsc?: boolean;
  swipeDuration?: number;
  minZoom?: number;
  maxZoom?: number;
  doubleTapZoom?: number;
  teleport?: TeleportProps['to'] | false;
  zIndex?: number | string;
}

export interface ImagePreviewExpose {
  close: () => void;
  next: () => void;
  prev: () => void;
  swipeTo: (index: number) => void;
  resetScale: () => void;
}

export type ImagePreviewInstance = ComponentPublicInstance<ImagePreviewProps, ImagePreviewExpose>;

export interface ImagePreviewChangePayload {
  index: number;
  item?: ImagePreviewItem;
}

export interface ImagePreviewScalePayload extends ImagePreviewChangePayload {
  scale: number;
}

export function normalizeImagePreviewItem(
  source: ImagePreviewSource,
  index: number,
): ImagePreviewItem {
  if (typeof source === 'string') {
    return { src: source, alt: `预览图片 ${index + 1}` };
  }

  return {
    ...source,
    src: source.src,
    alt: source.alt ?? source.caption ?? `预览图片 ${index + 1}`,
  };
}

export function normalizeImagePreviewIndex(index: number, length: number, loop = true): number {
  if (length <= 0) return 0;
  const normalized = Math.trunc(Number(index) || 0);
  if (loop) return ((normalized % length) + length) % length;
  return Math.min(length - 1, Math.max(0, normalized));
}
