import type { UsageConfig } from '../../usage';

// 配置面板只暴露最常调整的视觉与交互参数。
export default {
  name: 'Popup 弹出层',
  component: 'KyPopup',
  description: '切换弹出方向、圆角、遮罩和安全区，实时查看移动端弹层效果。',
  props: [
    {
      name: 'position',
      label: '弹出位置',
      type: 'select',
      defaultValue: 'bottom',
      options: ['bottom', 'top', 'left', 'right', 'center'],
    },
    { name: 'round', label: '圆角面板', type: 'boolean', defaultValue: true },
    { name: 'overlay', label: '显示遮罩', type: 'boolean', defaultValue: true },
    { name: 'closeOnOverlay', label: '点击遮罩关闭', type: 'boolean', defaultValue: true },
    { name: 'safeArea', label: '适配底部安全区', type: 'boolean', defaultValue: true },
  ],
} satisfies UsageConfig;
