import type { UsageConfig } from '../../usage';
export default {
  name: 'Search 搜索',
  component: 'KySearch',
  description: '用于关键词输入、提交和清空，支持操作按钮与两种轮廓。',
  props: [
    { name: 'placeholder', label: '占位提示', type: 'text', defaultValue: '搜索组件或文档' },
    {
      name: 'shape',
      label: '形状',
      type: 'select',
      defaultValue: 'round',
      options: ['round', 'square'],
    },
    { name: 'clearable', label: '允许清空', type: 'boolean', defaultValue: true },
    { name: 'showAction', label: '展示操作', type: 'boolean', defaultValue: true },
    { name: 'disabled', label: '禁用', type: 'boolean', defaultValue: false },
    { name: 'readonly', label: '只读', type: 'boolean', defaultValue: false },
  ],
} satisfies UsageConfig;
