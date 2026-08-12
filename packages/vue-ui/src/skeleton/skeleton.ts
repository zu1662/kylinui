export type SkeletonSize = number | string;
export type SkeletonAvatarShape = 'round' | 'square';
export interface SkeletonProps {
  loading?: boolean;
  animate?: boolean;
  round?: boolean;
  title?: boolean;
  titleWidth?: SkeletonSize;
  row?: number;
  rowWidth?: SkeletonSize | SkeletonSize[];
  avatar?: boolean;
  avatarSize?: SkeletonSize;
  avatarShape?: SkeletonAvatarShape;
}
