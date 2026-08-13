import type { UsageConfig } from '../../usage';

export default {
  name: 'Grid 宫格',
  component: 'KyGrid',
  description: '以等宽列展示入口、工具或分类，支持方向、间距和正方形布局。',
  props: [
    { name: 'columnNum', label: '列数', type: 'number', defaultValue: 4, min: 2, max: 6 },
    { name: 'gutter', label: '间距', type: 'number', defaultValue: 0, min: 0, max: 24 },
    { name: 'border', label: '边框', type: 'boolean', defaultValue: true },
    { name: 'square', label: '正方形', type: 'boolean', defaultValue: false },
    { name: 'center', label: '内容居中', type: 'boolean', defaultValue: true },
    { name: 'clickable', label: '点击反馈', type: 'boolean', defaultValue: false },
    {
      name: 'direction',
      label: '排列方向',
      type: 'select',
      defaultValue: 'vertical',
      options: ['vertical', 'horizontal'],
    },
    { name: 'reverse', label: '反转图文', type: 'boolean', defaultValue: false },
    { name: 'iconSize', label: '图标尺寸', type: 'number', defaultValue: 28, min: 16, max: 40 },
  ],
} satisfies UsageConfig;
