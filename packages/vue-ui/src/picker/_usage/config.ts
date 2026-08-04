import type { UsageConfig } from '../../usage';

export default {
  name: 'Picker 滚动选择器',
  component: 'KyPicker',
  description: '通过拖动、滚轮或键盘在单列和多列数据中进行选择。',
  props: [
    { name: 'title', label: '标题', type: 'text', defaultValue: '选择出发时间' },
    {
      name: 'visibleItemCount',
      label: '可见选项数',
      type: 'number',
      defaultValue: 5,
      min: 3,
      max: 7,
      step: 2,
    },
    {
      name: 'itemHeight',
      label: '选项高度',
      type: 'number',
      defaultValue: 44,
      min: 36,
      max: 56,
      step: 4,
    },
    { name: 'showToolbar', label: '显示工具栏', type: 'boolean', defaultValue: true },
    { name: 'disabled', label: '禁用', type: 'boolean', defaultValue: false },
  ],
} satisfies UsageConfig;
