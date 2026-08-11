import type { UsageConfig } from '../../usage';
export default {
  name: 'Empty 空状态',
  component: 'KyEmpty',
  description: '用于列表、搜索或网络异常时的空内容反馈。',
  props: [
    {
      name: 'image',
      label: '类型',
      type: 'select',
      defaultValue: 'default',
      options: ['default', 'search', 'network', 'error'],
    },
    { name: 'imageSize', label: '图形尺寸', type: 'number', defaultValue: 112, min: 72, max: 160 },
    { name: 'description', label: '描述', type: 'text', defaultValue: '暂无相关内容' },
  ],
} satisfies UsageConfig;
