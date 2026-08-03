export type TagTone = 'brand' | 'info' | 'success' | 'warning' | 'danger' | 'vip';
export type TagVariant = 'soft' | 'outline' | 'solid';
export interface TagProps {
  tone?: TagTone;
  variant?: TagVariant;
  round?: boolean;
  closable?: boolean;
}
