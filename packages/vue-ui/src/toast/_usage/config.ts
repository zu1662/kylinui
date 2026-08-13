import type { UsageConfig } from '../../usage';

export default {
  name: 'Toast 轻提示',
  component: 'KyToast',
  description: '通过服务函数展示文字、结果或加载反馈，并支持位置、遮罩和关闭时机配置。',
  codeTitle: 'Composition API',
  // 服务式组件不能生成普通模板，调用代码需与真实导出保持一致。
  generateCode(values) {
    return [
      'showToast({',
      `  type: ${JSON.stringify(String(values.type))},`,
      `  message: ${JSON.stringify(String(values.message))},`,
      `  position: ${JSON.stringify(String(values.position))},`,
      `  duration: ${Number(values.duration)},`,
      `  forbidClick: ${Boolean(values.forbidClick)},`,
      '});',
    ].join('\n');
  },
  props: [
    {
      name: 'type',
      label: '类型',
      type: 'select',
      defaultValue: 'text',
      options: ['text', 'success', 'error', 'loading'],
    },
    {
      name: 'message',
      label: '文案',
      type: 'text',
      defaultValue: '提示内容',
    },
    {
      name: 'position',
      label: '位置',
      type: 'select',
      defaultValue: 'center',
      options: ['top', 'center', 'bottom'],
    },
    {
      name: 'duration',
      label: '持续时间',
      type: 'number',
      defaultValue: 2000,
      min: 0,
      max: 10000,
      step: 500,
    },
    {
      name: 'forbidClick',
      label: '禁止背景点击',
      type: 'boolean',
      defaultValue: false,
    },
  ],
} satisfies UsageConfig;
