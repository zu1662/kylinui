import type { UsageConfig } from '../../usage';

export default {
  name: 'ImagePreview 图片预览',
  component: 'showImagePreview',
  description: '全屏预览多张图片，支持循环切换、页码、关闭方式和缩放范围配置。',
  props: [
    { name: 'loop', label: '循环切换', type: 'boolean', defaultValue: true },
    { name: 'showIndex', label: '显示页码', type: 'boolean', defaultValue: true },
    { name: 'showArrows', label: '显示箭头', type: 'boolean', defaultValue: true },
    { name: 'closeable', label: '显示关闭按钮', type: 'boolean', defaultValue: true },
    {
      name: 'closeOnClickOverlay',
      label: '点击空白关闭',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'maxZoom',
      label: '最大缩放',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 6,
      step: 0.5,
    },
  ],
  codeTitle: 'JavaScript',
  generateCode: (values) => {
    const options = [
      `loop: ${Boolean(values.loop)}`,
      `showIndex: ${Boolean(values.showIndex)}`,
      `showArrows: ${Boolean(values.showArrows)}`,
      `closeable: ${Boolean(values.closeable)}`,
      `closeOnClickOverlay: ${Boolean(values.closeOnClickOverlay)}`,
      `maxZoom: ${Number(values.maxZoom) || 3}`,
    ];
    return [
      `import { showImagePreview } from '@kylinui/vue';`,
      '',
      'showImagePreview({',
      `  images,`,
      ...options.map((item) => `  ${item},`),
      '});',
    ].join('\n');
  },
} satisfies UsageConfig;
