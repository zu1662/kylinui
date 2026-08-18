import type { UsageConfig } from '../../usage';

export default {
  name: 'Textarea 多行输入框',
  component: 'KyTextarea',
  description: '支持自动高度、字数统计、错误说明和移动端输入语义的多行输入控件。',
  props: [
    {
      name: 'label',
      label: '标签',
      type: 'text',
      defaultValue: '备注',
    },
    {
      name: 'placeholder',
      label: '占位文案',
      type: 'text',
      defaultValue: '请输入补充说明',
    },
    {
      name: 'helper',
      label: '辅助说明',
      type: 'text',
      defaultValue: '最多输入 120 个字符',
    },
    {
      name: 'error',
      label: '错误说明',
      type: 'text',
      defaultValue: '',
    },
    {
      name: 'rows',
      label: '基础行数',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 10,
      step: 1,
    },
    {
      name: 'maxLength',
      label: '最大长度',
      type: 'number',
      defaultValue: 120,
      min: 1,
      max: 500,
      step: 1,
    },
    {
      name: 'showWordLimit',
      label: '显示字数',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'autosize',
      label: '自动高度',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'disabled',
      label: '禁用',
      type: 'boolean',
      defaultValue: false,
    },
    {
      name: 'readonly',
      label: '只读',
      type: 'boolean',
      defaultValue: false,
    },
  ],
} satisfies UsageConfig;
