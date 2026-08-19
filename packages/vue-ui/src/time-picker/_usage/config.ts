import type { UsageConfig } from '../../usage';

export default {
  name: 'TimePicker 时间选择器',
  component: 'KyTimePicker',
  description: '通过时、分、秒滚动列选择一天内的时间，并支持范围和步长约束。',
  props: [
    { name: 'title', label: '标题', type: 'text', defaultValue: '选择时间' },
    {
      name: 'minuteStep',
      label: '分钟步长',
      type: 'number',
      defaultValue: 5,
      min: 1,
      max: 30,
      step: 1,
    },
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
