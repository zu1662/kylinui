import type { UsageConfig } from '../../usage';
export default {
  name: 'Cell 单元格',
  component: 'KyCell',
  description: '列表中的基础信息与操作入口。',
  props: [
    { name: 'title', label: '标题', type: 'text', defaultValue: '单元格' },
    { name: 'value', label: '右侧内容', type: 'text', defaultValue: '内容' },
    { name: 'label', label: '描述', type: 'text', defaultValue: '补充说明' },
    { name: 'isLink', label: '链接样式', type: 'boolean', defaultValue: true },
    { name: 'required', label: '必填标记', type: 'boolean', defaultValue: false },
    { name: 'disabled', label: '禁用', type: 'boolean', defaultValue: false },
  ],
} satisfies UsageConfig;
