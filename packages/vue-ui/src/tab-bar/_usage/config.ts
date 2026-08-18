import type { UsageConfig } from '../../usage';

export default {
  name: 'Tab Bar 标签导航',
  component: 'KyTabBar',
  description: '体验活动项滚动可见、禁用跳过、图标切换、徽标和底部安全区。',
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
    { name: 'scrollable', label: '强制横向滚动', type: 'boolean', defaultValue: true },
    { name: 'animated', label: '切换动画', type: 'boolean', defaultValue: true },
    { name: 'safeAreaInsetBottom', label: '底部安全区', type: 'boolean', defaultValue: false },
  ],
} satisfies UsageConfig;
