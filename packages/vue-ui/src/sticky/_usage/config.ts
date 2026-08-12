import type { UsageConfig } from '../../usage';
export default {
  name: 'Sticky 粘性布局',
  component: 'KySticky',
  description: '滚动到边界后将内容固定在视口顶部或底部。',
  props: [
    {
      name: 'position',
      label: '固定位置',
      type: 'select',
      defaultValue: 'top',
      options: ['top', 'bottom'],
    },
    { name: 'offset', label: '边界距离', type: 'number', defaultValue: 0, min: 0, max: 120 },
    { name: 'zIndex', label: '层级', type: 'number', defaultValue: 20, min: 1, max: 100 },
  ],
} satisfies UsageConfig;
