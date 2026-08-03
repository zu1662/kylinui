import type { UsageConfig } from '../../usage';

// 配置项由文档站读取，用于生成实时预览控件与 Vue Template。
export default {
  name: 'System Bar 系统栏',
  component: 'KySystemBar',
  description: '提供返回、居中标题、右侧操作和顶部安全区适配。',
  props: [
    {
      name: 'title',
      label: '标题',
      type: 'text',
      defaultValue: '行程详情',
    },
    {
      name: 'theme',
      label: '主题',
      type: 'select',
      defaultValue: 'light',
      options: ['light', 'dark', 'gradient'],
    },
    {
      name: 'showBack',
      label: '返回按钮',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'safeTop',
      label: '顶部安全区',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'sticky',
      label: '吸顶',
      type: 'boolean',
      defaultValue: false,
    },
  ],
} satisfies UsageConfig;
