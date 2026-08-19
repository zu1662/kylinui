import type { UsageConfig } from '../../usage';

export default {
  name: 'Notify 消息提示',
  component: 'KyNotify',
  description: '在页面边缘展示高优先级消息，支持语义类型、位置、图标和主动关闭。',
  codeTitle: 'Composition API',
  // 服务式组件不能生成普通模板，调用代码需与真实导出保持一致。
  generateCode(values) {
    return [
      'showNotify({',
      `  type: ${JSON.stringify(String(values.type))},`,
      `  message: ${JSON.stringify(String(values.message))},`,
      `  position: ${JSON.stringify(String(values.position))},`,
      `  duration: ${Number(values.duration)},`,
      `  showIcon: ${Boolean(values.showIcon)},`,
      `  closeable: ${Boolean(values.closeable)},`,
      '});',
    ].join('\n');
  },
  props: [
    {
      name: 'type',
      label: '类型',
      type: 'select',
      defaultValue: 'primary',
      options: ['primary', 'success', 'warning', 'danger'],
    },
    { name: 'message', label: '文案', type: 'text', defaultValue: '这是一条重要通知' },
    {
      name: 'position',
      label: '位置',
      type: 'select',
      defaultValue: 'top',
      options: ['top', 'bottom'],
    },
    {
      name: 'duration',
      label: '持续时间',
      type: 'number',
      defaultValue: 3000,
      min: 0,
      max: 10000,
      step: 500,
    },
    { name: 'showIcon', label: '显示图标', type: 'boolean', defaultValue: true },
    { name: 'closeable', label: '显示关闭按钮', type: 'boolean', defaultValue: false },
  ],
} satisfies UsageConfig;
