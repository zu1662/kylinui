import type { UsageConfig } from '../../usage';

export default {
  name: 'Search 搜索',
  component: 'KySearch',
  description: '体验搜索提交、取消、格式化、建议列表和加载状态。',
  props: [
    { name: 'placeholder', label: '占位提示', type: 'text', defaultValue: '搜索组件或文档' },
    {
      name: 'shape',
      label: '形状',
      type: 'select',
      defaultValue: 'round',
      options: ['round', 'square'],
    },
    { name: 'maxLength', label: '最大长度', type: 'number', defaultValue: 20, min: 1, max: 50 },
    { name: 'clearable', label: '允许清空', type: 'boolean', defaultValue: true },
    { name: 'showAction', label: '展示取消', type: 'boolean', defaultValue: true },
    { name: 'loading', label: '加载中', type: 'boolean', defaultValue: false },
    { name: 'showSuggestions', label: '展示建议', type: 'boolean', defaultValue: true },
    { name: 'disabled', label: '禁用', type: 'boolean', defaultValue: false },
    { name: 'readonly', label: '只读', type: 'boolean', defaultValue: false },
  ],
} satisfies UsageConfig;
