import type { UsageConfig } from '../../usage';
export default {
  name: 'Collapse 折叠面板',
  component: 'KyCollapse',
  description: '分组收纳说明内容，支持手风琴和多项展开。',
  props: [
    { name: 'accordion', label: '手风琴模式', type: 'boolean', defaultValue: false },
    { name: 'border', label: '外边框', type: 'boolean', defaultValue: true },
  ],
} satisfies UsageConfig;
