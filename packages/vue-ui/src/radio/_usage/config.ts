import type { UsageConfig } from '../../usage';

// 配置项由文档站读取，用于生成实时预览控件与 Vue Template。
export default {
  name: 'Radio 单选框',
  component: 'KyRadio',
  description: '用于一组选项中的唯一选择。',
  props: [
    {
      name: 'label',
      label: '标签',
      type: 'text',
      defaultValue: '经济舱',
    },
    {
      name: 'disabled',
      label: '禁用',
      type: 'boolean',
      defaultValue: false,
    },
  ],
} satisfies UsageConfig;
