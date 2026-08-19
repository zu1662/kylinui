import type { UsageConfig } from '../../usage';

export default {
  name: 'DatePicker 日期选择器',
  component: 'KyDatePicker',
  description: '通过年、月、日滚动列选择单个日期，并自动约束可选范围。',
  props: [
    { name: 'title', label: '标题', type: 'text', defaultValue: '选择日期' },
    {
      name: 'visibleItemCount',
      label: '可见选项数',
      type: 'number',
      defaultValue: 5,
      min: 3,
      max: 7,
      step: 2,
    },
    { name: 'showToolbar', label: '显示工具栏', type: 'boolean', defaultValue: true },
    { name: 'disabled', label: '禁用', type: 'boolean', defaultValue: false },
  ],
} satisfies UsageConfig;
