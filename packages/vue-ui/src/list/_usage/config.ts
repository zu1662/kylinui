import type { UsageConfig } from '../../usage';

export default {
  name: 'List 列表加载',
  component: 'KyList',
  description: '内容接近滚动边界时触发加载，并统一展示加载、错误与完成状态。',
  props: [
    { name: 'offset', label: '预加载距离', type: 'number', defaultValue: 80, min: 0, max: 300 },
    {
      name: 'direction',
      label: '加载方向',
      type: 'select',
      defaultValue: 'down',
      options: ['down', 'up'],
    },
    { name: 'immediateCheck', label: '初始检查', type: 'boolean', defaultValue: true },
    { name: 'disabled', label: '禁用加载', type: 'boolean', defaultValue: false },
    { name: 'finishedText', label: '完成提示', type: 'text', defaultValue: '没有更多内容了' },
  ],
} satisfies UsageConfig;
