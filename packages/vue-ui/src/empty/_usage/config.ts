import type { UsageConfig } from '../../usage';

export default {
  name: 'Empty 空状态',
  component: 'KyEmpty',
  description: '通过标题、描述、插图类型和操作区组合列表、网络或权限空状态。',
  props: [
    {
      name: 'image',
      label: '类型',
      type: 'select',
      defaultValue: 'network',
      options: ['default', 'search', 'network', 'error'],
    },
    { name: 'imageSize', label: '图形尺寸', type: 'number', defaultValue: 112, min: 72, max: 160 },
    { name: 'title', label: '标题', type: 'text', defaultValue: '网络连接失败' },
    { name: 'description', label: '描述', type: 'text', defaultValue: '请检查网络后重新加载' },
  ],
} satisfies UsageConfig;
