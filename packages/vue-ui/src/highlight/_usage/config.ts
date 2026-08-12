import type { UsageConfig } from '../../usage';

export default {
  name: 'Highlight 关键词高亮',
  component: 'KyHighlight',
  description: '从完整文本中标记一个或多个关键词，并支持大小写与正则匹配策略。',
  props: [
    {
      name: 'text',
      label: '完整文本',
      type: 'text',
      defaultValue: '麒麟设计系统让移动端界面更一致、更易维护。',
    },
    { name: 'keywords', label: '关键词', type: 'text', defaultValue: '设计系统' },
    { name: 'caseSensitive', label: '区分大小写', type: 'boolean', defaultValue: false },
    { name: 'literal', label: '普通文本匹配', type: 'boolean', defaultValue: true },
    {
      name: 'tag',
      label: '根标签',
      type: 'select',
      defaultValue: 'p',
      options: ['span', 'p', 'div'],
    },
  ],
} satisfies UsageConfig;
