import type { UsageConfig } from '../../usage';

// 配置项由文档站读取，用于生成实时预览控件与 Vue Template。
export default {
  name: 'Steps 步骤器',
  component: 'KySteps',
  description: '展示流程进度，并明确完成、当前、等待和错误状态。',
  props: [
    {
      name: 'current',
      label: '当前步骤',
      type: 'number',
      defaultValue: 1,
      min: 0,
      max: 3,
      step: 1,
    },
    {
      name: 'direction',
      label: '方向',
      type: 'select',
      defaultValue: 'horizontal',
      options: ['horizontal', 'vertical'],
    },
  ],
} satisfies UsageConfig;
