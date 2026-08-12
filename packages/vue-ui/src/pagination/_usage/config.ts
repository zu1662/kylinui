import type { UsageConfig } from '../../usage';
export default {
  name: 'Pagination 分页',
  component: 'KyPagination',
  description: '在多页内容之间切换，支持页码和简洁两种模式。',
  props: [
    { name: 'totalItems', label: '数据总数', type: 'number', defaultValue: 96, min: 0 },
    { name: 'itemsPerPage', label: '每页数量', type: 'number', defaultValue: 10, min: 1 },
    { name: 'showPageSize', label: '页码数量', type: 'number', defaultValue: 5, min: 3 },
    {
      name: 'mode',
      label: '展示模式',
      type: 'select',
      defaultValue: 'multi',
      options: ['multi', 'simple'],
    },
    { name: 'forceEllipses', label: '首尾页码', type: 'boolean', defaultValue: true },
    { name: 'disabled', label: '禁用', type: 'boolean', defaultValue: false },
  ],
} satisfies UsageConfig;
