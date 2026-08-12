import type { UsageConfig } from '../../usage';

export default {
  name: 'RollingText 数字翻牌',
  component: 'KyRollingText',
  description: '将数值拆分为独立数字位，并以可控方向和节奏完成翻牌动画。',
  props: [
    {
      name: 'value',
      label: '结束数值',
      type: 'number',
      defaultValue: 2048,
      min: -999999,
      max: 999999,
    },
    {
      name: 'startValue',
      label: '起始数值',
      type: 'number',
      defaultValue: 0,
      min: -999999,
      max: 999999,
    },
    {
      name: 'duration',
      label: '动画时长',
      type: 'number',
      defaultValue: 1000,
      min: 0,
      max: 5000,
      step: 100,
    },
    { name: 'autoStart', label: '自动播放', type: 'boolean', defaultValue: true },
    {
      name: 'direction',
      label: '滚动方向',
      type: 'select',
      defaultValue: 'up',
      options: ['up', 'down'],
    },
    {
      name: 'minIntegerDigits',
      label: '最少整数位',
      type: 'number',
      defaultValue: 4,
      min: 1,
      max: 10,
    },
    { name: 'decimalPlaces', label: '小数位数', type: 'number', defaultValue: 0, min: 0, max: 4 },
    { name: 'thousands', label: '千位分隔', type: 'boolean', defaultValue: false },
    { name: 'stagger', label: '错峰滚动', type: 'boolean', defaultValue: true },
  ],
} satisfies UsageConfig;
