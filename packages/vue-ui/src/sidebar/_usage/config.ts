import type { UsageConfig } from '../../usage';

export default {
  name: 'Sidebar 侧边导航',
  component: 'KySidebar',
  description: '体验纵向活动项滚动可见、禁用跳过、图标、徽标和安全区。',
  props: [
    { name: 'scrollToActive', label: '活动项滚动可见', type: 'boolean', defaultValue: true },
    { name: 'safeAreaInsetTop', label: '顶部安全区', type: 'boolean', defaultValue: false },
    { name: 'safeAreaInsetBottom', label: '底部安全区', type: 'boolean', defaultValue: false },
  ],
} satisfies UsageConfig;
