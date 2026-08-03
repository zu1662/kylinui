import type { UsageConfig } from '../../usage';

// 配置项由文档站读取，用于生成实时预览控件与 Vue Template。
export default {
  name: 'Input 输入框',
  component: 'KyInput',
  description: '包含标签、辅助信息、错误状态和清空能力的移动端输入控件。',
  props: [
    {
      name: 'label',
      label: '标签',
      type: 'text',
      defaultValue: '手机号',
    },
    {
      name: 'placeholder',
      label: '占位文案',
      type: 'text',
      defaultValue: '请输入手机号',
    },
    {
      name: 'helper',
      label: '辅助说明',
      type: 'text',
      defaultValue: '',
    },
    {
      name: 'error',
      label: '错误说明',
      type: 'text',
      defaultValue: '',
    },
    {
      name: 'type',
      label: '输入类型',
      type: 'select',
      defaultValue: 'tel',
      options: ['text', 'tel', 'email', 'password', 'number'],
    },
    {
      name: 'clearable',
      label: '可清空',
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
