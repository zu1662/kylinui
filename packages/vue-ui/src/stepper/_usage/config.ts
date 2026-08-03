import type { UsageConfig } from '../../usage';

// 配置项由文档站读取，用于生成实时预览控件与 Vue Template。
export default {
  name: 'Stepper 步进器',
  component: 'KyStepper',
  description: '通过增加、减少或手动输入调整离散数值。',
  props: [
    {
      name: 'label',
      label: '无障碍标签',
      type: 'text',
      defaultValue: '数量',
    },
    {
      name: 'min',
      label: '最小值',
      type: 'number',
      defaultValue: 0,
      min: 0,
      max: 99,
      step: 1,
    },
    {
      name: 'max',
      label: '最大值',
      type: 'number',
      defaultValue: 9,
      min: 1,
      max: 99,
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
      name: 'disabled',
      label: '禁用',
      type: 'boolean',
      defaultValue: false,
    },
  ],
} satisfies UsageConfig;
