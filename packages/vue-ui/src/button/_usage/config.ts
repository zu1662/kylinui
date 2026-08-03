import type { UsageConfig } from '../../usage';

// 配置项由文档站读取，用于生成实时预览控件与 Vue Template。
export default {
  name: 'Button 按钮',
  component: 'KyButton',
  description: '承载页面中的主要、次要与危险操作。',
  props: [
    {
      name: 'variant',
      label: '类型',
      type: 'select',
      defaultValue: 'primary',
      options: ['primary', 'secondary', 'text', 'danger', 'gradient'],
    },
    {
      name: 'size',
      label: '尺寸',
      type: 'select',
      defaultValue: 'medium',
      options: ['large', 'medium', 'small', 'mini'],
    },
    {
      name: 'block',
      label: '通栏',
      type: 'boolean',
      defaultValue: false,
    },
    {
      name: 'loading',
      label: '加载中',
      type: 'boolean',
      defaultValue: false,
    },
    {
      name: 'disabled',
      label: '禁用',
      type: 'boolean',
      defaultValue: false,
    },
    {
      name: 'subtitle',
      label: '副标题',
      type: 'text',
      defaultValue: '',
    },
  ],
} satisfies UsageConfig;
