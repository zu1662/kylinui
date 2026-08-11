import type { UsageConfig } from '../../usage';
export default {
  name: 'NavBar 导航栏',
  component: 'KyNavBar',
  description: '页面顶部标题和左右操作区域。',
  props: [
    { name: 'title', label: '标题', type: 'text', defaultValue: '页面标题' },
    { name: 'leftText', label: '左侧文字', type: 'text', defaultValue: '返回' },
    { name: 'rightText', label: '右侧文字', type: 'text', defaultValue: '更多' },
    { name: 'leftArrow', label: '返回箭头', type: 'boolean', defaultValue: true },
  ],
} satisfies UsageConfig;
