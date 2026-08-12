import type { UsageConfig } from '../../usage';
export default {
  name: 'Skeleton 骨架屏',
  component: 'KySkeleton',
  description: '内容加载前提供稳定占位，降低布局跳动。',
  props: [
    { name: 'loading', label: '加载中', type: 'boolean', defaultValue: true },
    { name: 'animate', label: '动画', type: 'boolean', defaultValue: true },
    { name: 'round', label: '圆角行', type: 'boolean', defaultValue: false },
    { name: 'title', label: '标题占位', type: 'boolean', defaultValue: true },
    { name: 'row', label: '段落行数', type: 'number', defaultValue: 3, min: 0, max: 8 },
    { name: 'avatar', label: '头像占位', type: 'boolean', defaultValue: true },
    { name: 'avatarSize', label: '头像尺寸', type: 'number', defaultValue: 48, min: 24, max: 80 },
    {
      name: 'avatarShape',
      label: '头像形状',
      type: 'select',
      defaultValue: 'round',
      options: ['round', 'square'],
    },
  ],
} satisfies UsageConfig;
