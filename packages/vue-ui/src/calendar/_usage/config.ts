import type { UsageConfig } from '../../usage';

export default {
  name: 'Calendar 日历',
  component: 'KyCalendar',
  description: '用于单选、多选或范围选择日期，默认可上下滚动浏览相邻月份。',
  props: [
    {
      name: 'type',
      label: '选择类型',
      type: 'select',
      defaultValue: 'single',
      options: ['single', 'range', 'multiple'],
    },
    {
      name: 'switchMode',
      label: '切换模式',
      type: 'select',
      defaultValue: 'none',
      options: ['none', 'month', 'year-month'],
    },
    { name: 'showMonthMark', label: '月份背景数字', type: 'boolean', defaultValue: true },
    { name: 'title', label: '标题', type: 'text', defaultValue: '选择出发日期' },
    { name: 'showConfirm', label: '显示确认按钮', type: 'boolean', defaultValue: true },
    { name: 'allowSameDay', label: '范围可选同日', type: 'boolean', defaultValue: false },
    {
      name: 'firstDayOfWeek',
      label: '每周起始日',
      type: 'number',
      defaultValue: 1,
      min: 0,
      max: 6,
      step: 1,
    },
  ],
} satisfies UsageConfig;
