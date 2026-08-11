export type LoadingType = 'circular' | 'spinner';
export interface LoadingProps {
  type?: LoadingType;
  size?: number | string;
  color?: string;
  textColor?: string;
  textSize?: number | string;
  vertical?: boolean;
}
