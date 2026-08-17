import type { UsageConfig } from '../../usage';

// 配置项由文档站读取，用于生成实时预览控件与 Vue Template。
export default {
  name: 'Switch 开关',
  component: 'KySwitch',
  description: '用于立即生效的二元状态切换。',
  props: [
    {
      name: 'label',
      label: '标签',
      type: 'text',
      defaultValue: '接收状态提醒',
    },
    {
      name: 'size',
      label: '尺寸',
      type: 'select',
      defaultValue: 'medium',
      options: ['small', 'medium'],
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
  ],
} satisfies UsageConfig;
