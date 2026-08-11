import type { UsageConfig } from '../../usage';
export default {
  name: 'Grid 宫格',
  component: 'KyGrid',
  description: '以等宽列展示入口、工具或分类。',
  props: [
    { name: 'columnNum', label: '列数', type: 'number', defaultValue: 4, min: 2, max: 6 },
    { name: 'gutter', label: '间距', type: 'number', defaultValue: 0, min: 0, max: 24 },
    { name: 'border', label: '边框', type: 'boolean', defaultValue: true },
    { name: 'square', label: '正方形', type: 'boolean', defaultValue: false },
    { name: 'clickable', label: '点击反馈', type: 'boolean', defaultValue: true },
  ],
} satisfies UsageConfig;
