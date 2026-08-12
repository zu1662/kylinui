import type { UsageConfig } from '../../usage';
export default {
  name: 'TextEllipsis 文本省略',
  component: 'KyTextEllipsis',
  description: '按指定行数收起长文本，并按需提供展开和收起操作。',
  props: [
    { name: 'rows', label: '收起行数', type: 'number', defaultValue: 3, min: 1, max: 8 },
    { name: 'expandText', label: '展开文字', type: 'text', defaultValue: '展开' },
    { name: 'collapseText', label: '收起文字', type: 'text', defaultValue: '收起' },
    { name: 'expandable', label: '允许展开', type: 'boolean', defaultValue: true },
  ],
} satisfies UsageConfig;
