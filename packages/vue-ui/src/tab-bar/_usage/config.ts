import type { UsageConfig } from '../../usage';

export default {
  name: 'Tab Bar 标签导航',
  component: 'KyTabBar',
  description: '支持固定等分和横向滚动两种移动端标签导航模式。',
  props: [
    {
      name: 'fixedCount',
      label: '固定可见数量',
      type: 'number',
      defaultValue: 4,
      min: 0,
      max: 6,
      step: 1,
    },
    { name: 'scrollable', label: '强制横向滚动', type: 'boolean', defaultValue: false },
    { name: 'animated', label: '切换动画', type: 'boolean', defaultValue: true },
  ],
} satisfies UsageConfig;
