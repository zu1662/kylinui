import type { UsageConfig } from '../../usage';

export default {
  name: 'Action Sheet 动作面板',
  component: 'KyActionSheet',
  description: '适合移动端底部操作、规则说明和带选项卡的确认流程。',
  props: [
    { name: 'title', label: '标题', type: 'text', defaultValue: '选择服务' },
    { name: 'showClose', label: '显示关闭按钮', type: 'boolean', defaultValue: true },
    { name: 'closeOnOverlay', label: '点击遮罩关闭', type: 'boolean', defaultValue: true },
    { name: 'closeOnSwipe', label: '下拉关闭', type: 'boolean', defaultValue: true },
    {
      name: 'animation',
      label: '弹出动画',
      type: 'select',
      defaultValue: 'slide-up',
      options: [
        'zoom',
        'punch',
        'slide-up',
        'slide-down',
        'slide-left',
        'slide-right',
        'fade',
        'fade-up',
        'fade-down',
        'fade-left',
        'fade-right',
        'post-up',
        'none',
      ],
    },
    { name: 'heightFixed', label: '固定高度', type: 'boolean', defaultValue: false },
    {
      name: 'heightFixedValue',
      label: '固定高度 vh',
      type: 'number',
      defaultValue: 70,
      min: 40,
      max: 90,
      step: 5,
    },
  ],
} satisfies UsageConfig;
