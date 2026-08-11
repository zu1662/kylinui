import type { UsageConfig } from '../../usage';

export default {
  name: 'NavBar 导航栏',
  component: 'KyNavBar',
  description: '页面顶部标题、返回操作、主题和安全区能力。',
  props: [
    { name: 'title', label: '标题', type: 'text', defaultValue: '页面详情' },
    { name: 'leftText', label: '左侧文字', type: 'text', defaultValue: '返回' },
    { name: 'rightText', label: '右侧文字', type: 'text', defaultValue: '更多' },
    { name: 'leftArrow', label: '返回箭头', type: 'boolean', defaultValue: true },
    {
      name: 'theme',
      label: '主题',
      type: 'select',
      defaultValue: 'light',
      options: ['light', 'dark', 'gradient'],
    },
    {
      name: 'safeAreaInsetTop',
      label: '顶部安全区',
      type: 'boolean',
      defaultValue: false,
    },
    { name: 'sticky', label: '吸顶', type: 'boolean', defaultValue: false },
  ],
} satisfies UsageConfig;
