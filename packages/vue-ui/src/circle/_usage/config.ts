import type { UsageConfig } from '../../usage';
export default {
  name: 'Circle 环形进度',
  component: 'KyCircle',
  description: '以环形轨道展示任务完成比例。',
  props: [
    { name: 'percentage', label: '进度', type: 'number', defaultValue: 65, min: 0, max: 100 },
    { name: 'size', label: '尺寸', type: 'number', defaultValue: 112, min: 60, max: 180 },
    { name: 'strokeWidth', label: '线宽', type: 'number', defaultValue: 8, min: 2, max: 20 },
    { name: 'clockwise', label: '顺时针', type: 'boolean', defaultValue: true },
    { name: 'showText', label: '展示文字', type: 'boolean', defaultValue: true },
  ],
} satisfies UsageConfig;
