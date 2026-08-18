import type { UsageConfig } from '../../usage';

export default {
  name: 'NavBar 导航栏',
  component: 'KyNavBar',
  description: '体验返回拦截、标准点击事件、顶部安全区和多种主题。',
  props: [
    { name: 'title', label: '标题', type: 'text', defaultValue: '订单详情' },
    { name: 'leftText', label: '左侧文字', type: 'text', defaultValue: '返回' },
    { name: 'rightText', label: '右侧文字', type: 'text', defaultValue: '帮助' },
    { name: 'leftArrow', label: '返回箭头', type: 'boolean', defaultValue: true },
    {
      name: 'theme',
      label: '主题',
      type: 'select',
      defaultValue: 'light',
      options: ['light', 'dark', 'gradient'],
    },
    { name: 'safeAreaInsetTop', label: '顶部安全区', type: 'boolean', defaultValue: false },
    { name: 'sticky', label: '吸顶', type: 'boolean', defaultValue: false },
  ],
} satisfies UsageConfig;
