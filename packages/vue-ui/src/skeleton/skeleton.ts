export type SkeletonSize = number | string;
export type SkeletonAvatarShape = 'round' | 'square';
export type SkeletonPreset = 'custom' | 'avatar' | 'title' | 'paragraph' | 'list';
export interface SkeletonProps {
  loading?: boolean;
  animate?: boolean;
  preset?: SkeletonPreset;
  listCount?: number;
  round?: boolean;
  title?: boolean;
  titleWidth?: SkeletonSize;
  row?: number;
  rowWidth?: SkeletonSize | SkeletonSize[];
  avatar?: boolean;
  avatarSize?: SkeletonSize;
  avatarShape?: SkeletonAvatarShape;
}
