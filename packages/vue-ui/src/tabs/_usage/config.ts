import type { UsageConfig } from '../../usage';
export default {
  name: 'Tabs 标签页',
  component: 'KyTabs',
  description: '在同一层级内容间切换，支持线型、卡片型、动画与粘性导航。',
  props: [
    {
      name: 'type',
      label: '样式',
      type: 'select',
      defaultValue: 'line',
      options: ['line', 'card'],
    },
    { name: 'animated', label: '切换动画', type: 'boolean', defaultValue: true },
    { name: 'ellipsis', label: '标题省略', type: 'boolean', defaultValue: true },
    { name: 'shrink', label: '收缩排列', type: 'boolean', defaultValue: false },
    { name: 'sticky', label: '粘性导航', type: 'boolean', defaultValue: false },
    { name: 'offsetTop', label: '顶部距离', type: 'number', defaultValue: 0, min: 0, max: 100 },
  ],
} satisfies UsageConfig;
