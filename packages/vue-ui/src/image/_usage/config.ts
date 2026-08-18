import type { UsageConfig } from '../../usage';

export default {
  name: 'Image 图片',
  component: 'KyImage',
  description: '体验懒加载、有限重试、响应式图片参数和图片预览联动。',
  props: [
    {
      name: 'fit',
      label: '填充模式',
      type: 'select',
      defaultValue: 'cover',
      options: ['cover', 'contain', 'fill', 'none', 'scale-down'],
    },
    { name: 'round', label: '圆形', type: 'boolean', defaultValue: false },
    { name: 'lazy', label: '懒加载', type: 'boolean', defaultValue: true },
    { name: 'retry', label: '重试次数', type: 'number', defaultValue: 2, min: 0, max: 10 },
    { name: 'preview', label: '点击预览', type: 'boolean', defaultValue: true },
    { name: 'showLoading', label: '加载状态', type: 'boolean', defaultValue: true },
    { name: 'showError', label: '异常状态', type: 'boolean', defaultValue: true },
  ],
} satisfies UsageConfig;
