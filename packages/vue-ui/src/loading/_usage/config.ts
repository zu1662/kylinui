import type { UsageConfig } from '../../usage';
export default {
  name: 'Loading 加载',
  component: 'KyLoading',
  description: '表示局部内容或操作正在处理中。',
  props: [
    {
      name: 'type',
      label: '类型',
      type: 'select',
      defaultValue: 'circular',
      options: ['circular', 'spinner'],
    },
    { name: 'size', label: '尺寸', type: 'number', defaultValue: 28, min: 16, max: 64 },
    { name: 'vertical', label: '垂直排列', type: 'boolean', defaultValue: false },
  ],
} satisfies UsageConfig;
