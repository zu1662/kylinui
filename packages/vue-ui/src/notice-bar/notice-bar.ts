export type NoticeBarMode = 'closeable' | 'link' | '';
export interface NoticeBarProps {
  text?: string;
  mode?: NoticeBarMode;
  color?: string;
  background?: string;
  leftIcon?: string;
  wrapable?: boolean;
  scrollable?: boolean;
  delay?: number;
  speed?: number;
}
