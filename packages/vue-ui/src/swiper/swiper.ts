export interface SwiperItem {
  image?: string;
  url?: string;
  alt?: string;
  title?: string;
  [key: string]: unknown;
}

export interface SwiperProps {
  modelValue?: number;
  initialIndex?: number;
  data?: Array<SwiperItem | string>;
  loop?: boolean;
  autoplay?: boolean | number;
  interval?: number;
  duration?: number;
  showDots?: boolean;
  touchable?: boolean;
  scale?: number;
  gap?: number;
  ariaLabel?: string;
}
