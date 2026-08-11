import type { UsageConfig } from '../../usage';
export default {
  name: 'NoticeBar 通知栏',
  component: 'KyNoticeBar',
  description: '在页面内展示重要但非阻断性的通知。',
  props: [
    {
      name: 'text',
      label: '通知内容',
      type: 'text',
      defaultValue: '系统将在今晚 23:00 进行维护，请提前保存内容。',
    },
    {
      name: 'mode',
      label: '右侧模式',
      type: 'select',
      defaultValue: 'link',
      options: ['', 'link', 'closeable'],
    },
    { name: 'wrapable', label: '多行展示', type: 'boolean', defaultValue: false },
    { name: 'scrollable', label: '溢出滚动', type: 'boolean', defaultValue: true },
  ],
} satisfies UsageConfig;
