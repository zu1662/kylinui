import type { UsageConfig } from '../../usage';
export default {
  name: 'Space 间距',
  component: 'KySpace',
  description: '统一控制一组元素之间的横向或纵向间距。',
  props: [
    {
      name: 'direction',
      label: '方向',
      type: 'select',
      defaultValue: 'horizontal',
      options: ['horizontal', 'vertical'],
    },
    {
      name: 'size',
      label: '间距',
      type: 'select',
      defaultValue: 'small',
      options: ['mini', 'small', 'medium', 'large'],
    },
    {
      name: 'align',
      label: '对齐',
      type: 'select',
      defaultValue: 'center',
      options: ['start', 'center', 'end', 'baseline'],
    },
    { name: 'wrap', label: '自动换行', type: 'boolean', defaultValue: true },
  ],
} satisfies UsageConfig;
