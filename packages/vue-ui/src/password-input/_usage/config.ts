import type { UsageConfig } from '../../usage';

export default {
  name: 'PasswordInput 密码输入框',
  component: 'KyPasswordInput',
  description: '用于支付密码、验证码等定长敏感信息录入，支持连续与分隔布局。',
  props: [
    {
      name: 'length',
      label: '输入位数',
      type: 'number',
      defaultValue: 6,
      min: 1,
      max: 12,
      step: 1,
    },
    {
      name: 'type',
      label: '字符类型',
      type: 'select',
      defaultValue: 'number',
      options: ['number', 'text'],
    },
    {
      name: 'variant',
      label: '布局样式',
      type: 'select',
      defaultValue: 'joined',
      options: ['joined', 'separated'],
    },
    { name: 'mask', label: '隐藏输入内容', type: 'boolean', defaultValue: true },
    { name: 'showCursor', label: '显示光标', type: 'boolean', defaultValue: true },
    {
      name: 'info',
      label: '辅助说明',
      type: 'text',
      defaultValue: '请输入 6 位支付密码',
    },
    { name: 'error', label: '错误说明', type: 'text', defaultValue: '' },
    { name: 'disabled', label: '禁用', type: 'boolean', defaultValue: false },
    { name: 'readonly', label: '只读', type: 'boolean', defaultValue: false },
  ],
} satisfies UsageConfig;
