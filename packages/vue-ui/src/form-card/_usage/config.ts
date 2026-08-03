import type { UsageConfig } from '../../usage';

// 配置项由文档站读取，用于生成实时预览控件与 Vue Template。
export default {
  name: 'Form Card 表单卡片',
  component: 'KyFormCard',
  description: '按业务主题分组字段，建立清晰的表单信息层级。',
  props: [
    {
      name: 'title',
      label: '标题',
      type: 'text',
      defaultValue: '联系人信息',
    },
    {
      name: 'description',
      label: '说明',
      type: 'text',
      defaultValue: '用于接收订单与行程通知',
    },
    {
      name: 'bordered',
      label: '显示边框',
      type: 'boolean',
      defaultValue: true,
    },
  ],
} satisfies UsageConfig;
