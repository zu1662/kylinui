import type { UsageConfig } from '../../usage';

// 配置项由文档站读取，用于生成实时预览控件与 Vue Template。
export default {
  name: 'Popover 气泡',
  component: 'KyPopover',
  description: '在触发元素附近补充简短说明或轻量操作。',
  props: [
    {
      name: 'placement',
      label: '方位',
      type: 'select',
      defaultValue: 'top',
      options: [
        'top',
        'bottom',
        'left',
        'right'
      ]
    },
    {
      name: 'closeOnOutside',
      label: '点外关闭',
      type: 'boolean',
      defaultValue: true
    }
  ]
} satisfies UsageConfig;
