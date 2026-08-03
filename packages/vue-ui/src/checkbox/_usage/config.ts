import type { UsageConfig } from '../../usage';

// 配置项由文档站读取，用于生成实时预览控件与 Vue Template。
export default {
  name: 'Checkbox 复选框',
  component: 'KyCheckbox',
  description: '用于一个或多个可同时选择的选项。',
  props: [
    {
      name: 'label',
      label: '标签',
      type: 'text',
      defaultValue: '同意服务协议',
    },
    {
      name: 'indeterminate',
      label: '半选状态',
      type: 'boolean',
      defaultValue: false,
    },
    {
      name: 'disabled',
      label: '禁用',
      type: 'boolean',
      defaultValue: false,
    },
  ],
} satisfies UsageConfig;
