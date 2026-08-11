import type { UsageConfig } from '../../usage';

function resolvePreviewFormat(values: Record<string, unknown>): string {
  const format = String(values.format ?? 'HH:mm:ss');
  return values.millisecond === true && !format.includes('S') ? `${format}:SSS` : format;
}

export default {
  name: 'CountDown 倒计时',
  component: 'KyCountDown',
  description: '实时展示倒计时；开启毫秒刷新时，格式需要包含 S、SS 或 SSS。',
  props: [
    {
      name: 'time',
      label: '剩余毫秒',
      type: 'number',
      defaultValue: 3661000,
      min: 0,
      max: 604800000,
    },
    {
      name: 'format',
      label: '格式',
      type: 'select',
      defaultValue: 'HH:mm:ss',
      options: ['HH:mm:ss', 'DD 天 HH 时 mm 分 ss 秒', 'mm:ss:SSS', 'ss:SS', 'ss:S'],
    },
    { name: 'autoStart', label: '自动开始', type: 'boolean', defaultValue: true },
    {
      name: 'millisecond',
      label: '毫秒刷新（需 S 格式）',
      type: 'boolean',
      defaultValue: false,
    },
  ],
  generateCode(values) {
    const attrs = [
      `:time="${String(values.time ?? 0)}"`,
      `format="${resolvePreviewFormat(values)}"`,
      values.autoStart === true ? 'auto-start' : ':auto-start="false"',
      values.millisecond === true ? 'millisecond' : ':millisecond="false"',
    ];

    return ['<KyCountDown', ...attrs.map((attr) => `  ${attr}`), '/>'].join('\n');
  },
} satisfies UsageConfig;
