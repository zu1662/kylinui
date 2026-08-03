import type { UsageConfig } from '../../usage';

// 配置项由文档站读取，用于生成实时预览控件与 Vue Template。
export default {
  name: 'Tag 标签',
  component: 'KyTag',
  description: '用于轻量展示分类、属性与语义状态。',
  props: [
    {
      name: 'tone',
      label: '色调',
      type: 'select',
      defaultValue: 'brand',
      options: ['brand', 'info', 'success', 'warning', 'danger', 'vip'],
    },
    {
      name: 'variant',
      label: '样式',
      type: 'select',
      defaultValue: 'soft',
      options: ['soft', 'outline', 'solid'],
    },
    {
      name: 'round',
      label: '圆角',
      type: 'boolean',
      defaultValue: false,
    },
    {
      name: 'closable',
      label: '可关闭',
      type: 'boolean',
      defaultValue: false,
    },
  ],
} satisfies UsageConfig;
