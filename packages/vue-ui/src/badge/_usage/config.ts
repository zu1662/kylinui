import type { UsageConfig } from '../../usage';
export default {
  name: 'Badge 徽标',
  component: 'KyBadge',
  description: '在图标或内容右上角显示数量、文本或状态点。',
  props: [
    { name: 'content', label: '内容', type: 'number', defaultValue: 8, min: 0, max: 120 },
    { name: 'max', label: '最大值', type: 'number', defaultValue: 99, min: 1, max: 999 },
    { name: 'dot', label: '圆点模式', type: 'boolean', defaultValue: false },
    { name: 'showZero', label: '显示零值', type: 'boolean', defaultValue: true },
    {
      name: 'position',
      label: '位置',
      type: 'select',
      defaultValue: 'top-right',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
    },
  ],
} satisfies UsageConfig;
