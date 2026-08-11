import type { UsageConfig } from '../../usage';
export default {
  name: 'CountDown 倒计时',
  component: 'KyCountDown',
  description: '按毫秒时间差展示倒计时。',
  props: [
    {
      name: 'time',
      label: '剩余毫秒',
      type: 'number',
      defaultValue: 3661000,
      min: 0,
      max: 86400000,
    },
    {
      name: 'format',
      label: '格式',
      type: 'select',
      defaultValue: 'HH:mm:ss',
      options: ['HH:mm:ss', 'DD 天 HH 时 mm 分 ss 秒', 'mm:ss:SSS'],
    },
    { name: 'autoStart', label: '自动开始', type: 'boolean', defaultValue: true },
    { name: 'millisecond', label: '毫秒刷新', type: 'boolean', defaultValue: false },
  ],
} satisfies UsageConfig;
