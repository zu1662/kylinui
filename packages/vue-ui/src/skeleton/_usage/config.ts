import type { UsageConfig } from '../../usage';

export default {
  name: 'Skeleton 骨架屏',
  component: 'KySkeleton',
  description: '体验头像、标题、段落、列表等有限预设与自定义骨架。',
  props: [
    { name: 'loading', label: '加载中', type: 'boolean', defaultValue: true },
    { name: 'animate', label: '动画', type: 'boolean', defaultValue: true },
    {
      name: 'preset',
      label: '预设',
      type: 'select',
      defaultValue: 'list',
      options: ['custom', 'avatar', 'title', 'paragraph', 'list'],
    },
    { name: 'listCount', label: '列表数量', type: 'number', defaultValue: 3, min: 1, max: 8 },
    { name: 'round', label: '圆角行', type: 'boolean', defaultValue: false },
    { name: 'title', label: '自定义标题', type: 'boolean', defaultValue: true },
    { name: 'row', label: '自定义行数', type: 'number', defaultValue: 3, min: 0, max: 8 },
    { name: 'avatar', label: '自定义头像', type: 'boolean', defaultValue: true },
  ],
} satisfies UsageConfig;
