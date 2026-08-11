import type { UsageConfig } from '../../usage';
export default {
  name: 'Divider 分割线',
  component: 'KyDivider',
  description: '分隔内容区块，也可承载简短说明。',
  props: [
    {
      name: 'contentPosition',
      label: '文字位置',
      type: 'select',
      defaultValue: 'center',
      options: ['left', 'center', 'right'],
    },
    { name: 'dashed', label: '虚线', type: 'boolean', defaultValue: false },
    { name: 'hairline', label: '半像素线', type: 'boolean', defaultValue: true },
  ],
} satisfies UsageConfig;
