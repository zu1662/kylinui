import type { UsageConfig } from '../../usage';

export default {
  name: 'Icon 图标',
  component: 'KyIcon',
  description: '切换图标名称、尺寸、颜色、旋转和动画，实时查看线性 SVG 图标效果。',
  props: [
    {
      name: 'name',
      label: '图标名称',
      type: 'select',
      defaultValue: 'arrow-right',
      options: [
        'arrow-right',
        'arrow-down',
        'information-line',
        'doubt-line',
        'close',
        'checked',
        'uncheck',
        'add-line',
        'calendar-line',
        'trash-line',
        'edit-line',
        'copy-line',
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
    { name: 'spin', label: '旋转动画', type: 'boolean', defaultValue: false },
  ],
} satisfies UsageConfig;
