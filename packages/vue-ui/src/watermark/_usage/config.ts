import type { UsageConfig } from '../../usage';
export default {
  name: 'Watermark 水印',
  component: 'KyWatermark',
  description: '在内容区域上方重复展示文字或图片标记，且不拦截交互。',
  props: [
    { name: 'content', label: '水印文字', type: 'text', defaultValue: '内部资料' },
    { name: 'rotate', label: '旋转角度', type: 'number', defaultValue: -22, min: -90, max: 90 },
    {
      name: 'opacity',
      label: '透明度',
      type: 'number',
      defaultValue: 0.16,
      min: 0,
      max: 1,
      step: 0.02,
    },
    { name: 'gapX', label: '水平间距', type: 'number', defaultValue: 24, min: 0, max: 120 },
    { name: 'gapY', label: '垂直间距', type: 'number', defaultValue: 24, min: 0, max: 120 },
  ],
} satisfies UsageConfig;
