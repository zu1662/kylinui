import type { UsageConfig } from '../../usage';
export default {
  name: 'Image 图片',
  component: 'KyImage',
  description: '展示图片，并统一处理裁剪、圆角、懒加载和异常状态。',
  props: [
    {
      name: 'fit',
      label: '填充模式',
      type: 'select',
      defaultValue: 'cover',
      options: ['cover', 'contain', 'fill', 'none', 'scale-down'],
    },
    { name: 'round', label: '圆形', type: 'boolean', defaultValue: false },
    { name: 'lazy', label: '懒加载', type: 'boolean', defaultValue: false },
    { name: 'showLoading', label: '加载状态', type: 'boolean', defaultValue: true },
    { name: 'showError', label: '异常状态', type: 'boolean', defaultValue: true },
  ],
} satisfies UsageConfig;
