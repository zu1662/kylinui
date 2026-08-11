import type { UsageConfig } from '../../usage';

export default {
  name: 'Cell 单元格',
  component: 'KyCell',
  description: '展示列表信息、状态与可操作入口，支持卡片分组、图标、描述和方向箭头。',
  props: [
    { name: 'title', label: '标题', type: 'text', defaultValue: '账户与安全' },
    { name: 'value', label: '右侧内容', type: 'text', defaultValue: '已认证' },
    { name: 'label', label: '描述', type: 'text', defaultValue: '管理登录方式与安全设置' },
    { name: 'icon', label: '左侧图标', type: 'text', defaultValue: 'info' },
    {
      name: 'size',
      label: '尺寸',
      type: 'select',
      defaultValue: 'normal',
      options: ['normal', 'large'],
    },
    {
      name: 'arrowDirection',
      label: '箭头方向',
      type: 'select',
      defaultValue: 'right',
      options: ['right', 'down', 'up', 'left'],
    },
    { name: 'isLink', label: '展示箭头', type: 'boolean', defaultValue: true },
    { name: 'center', label: '垂直居中', type: 'boolean', defaultValue: false },
    { name: 'required', label: '必填标记', type: 'boolean', defaultValue: false },
    { name: 'border', label: '内分割线', type: 'boolean', defaultValue: true },
    { name: 'disabled', label: '禁用', type: 'boolean', defaultValue: false },
  ],
} satisfies UsageConfig;
