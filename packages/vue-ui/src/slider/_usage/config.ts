import type { UsageConfig } from '../../usage';

// 配置项由文档站读取，用于生成实时预览控件与 Vue Template。
export default {
  name: 'Slider 滑动选择器',
  component: 'KySlider',
  description: '在连续或分段范围内选择数值，并保留原生键盘能力。',
  props: [
    {
      name: 'label',
      label: '标签',
      type: 'text',
      defaultValue: '完成进度',
    },
    {
      name: 'min',
      label: '最小值',
      type: 'number',
      defaultValue: 1,
      min: 0,
      max: 99,
      step: 1,
    },
    {
      name: 'max',
      label: '最大值',
      type: 'number',
      defaultValue: 12,
      min: 1,
      max: 100,
      step: 1,
    },
    {
      name: 'step',
      label: '步长',
      type: 'number',
      defaultValue: 1,
      min: 1,
      max: 10,
      step: 1,
    },
    {
      name: 'showValue',
      label: '显示数值',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'disabled',
      label: '禁用',
      type: 'boolean',
      defaultValue: false,
    },
  ],
} satisfies UsageConfig;
