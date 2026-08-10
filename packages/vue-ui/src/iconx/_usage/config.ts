import type { UsageConfig } from '../../usage';

export default {
  name: 'IconX 字体图标',
  component: 'KyIconX',
  description: '基于同程出行 Iconfont 字体资源，统一展示项目内的功能图标。',
  props: [
    {
      name: 'name',
      label: '图标名称',
      type: 'select',
      defaultValue: 'arrow-right',
      options: [
        'arrow-left',
        'arrow-right',
        'close',
        'clear',
        'checked',
        'warning',
        'loading',
        'plus1',
        'reduce',
        'enshrine',
      ],
    },
    { name: 'size', label: '尺寸', type: 'number', defaultValue: 24, min: 12, max: 48, step: 2 },
    {
      name: 'color',
      label: '颜色',
      type: 'select',
      defaultValue: '#08795a',
      options: ['#08795a', '#261208', '#7b6f67', '#c73851'],
    },
    {
      name: 'rotate',
      label: '旋转角度',
      type: 'number',
      defaultValue: 0,
      min: 0,
      max: 360,
      step: 45,
    },
    { name: 'spin', label: '持续旋转', type: 'boolean', defaultValue: false },
  ],
} satisfies UsageConfig;
