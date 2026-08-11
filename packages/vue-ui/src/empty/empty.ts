export type EmptyImage = 'default' | 'search' | 'network' | 'error';
export interface EmptyProps {
  image?: EmptyImage;
  imageSize?: number | string;
  description?: string;
}
