import type { UsageConfig } from '../../usage';

// 配置项由文档站读取，用于生成实时预览控件与 Vue Template。
export default {
  name: 'Rating 评分器',
  component: 'KyRating',
  description: '使用明确的星级与数值反馈收集评分。',
  props: [
    {
      name: 'label',
      label: '无障碍标签',
      type: 'text',
      defaultValue: '服务评分',
    },
    {
      name: 'count',
      label: '星级数量',
      type: 'number',
      defaultValue: 5,
      min: 1,
      max: 10,
      step: 1,
    },
    {
      name: 'readonly',
      label: '只读',
      type: 'boolean',
      defaultValue: false,
    },
    {
      name: 'disabled',
      label: '禁用',
      type: 'boolean',
      defaultValue: false,
    },
  ],
} satisfies UsageConfig;
