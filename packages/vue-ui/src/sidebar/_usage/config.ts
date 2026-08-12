import type { UsageConfig } from '../../usage';
export default {
  name: 'Sidebar 侧边导航',
  component: 'KySidebar',
  description: '纵向展示同级导航项，适合分类、频道和设置菜单。',
  props: [
    { name: 'showBadge', label: '展示徽标', type: 'boolean', defaultValue: true },
    { name: 'disableSecond', label: '禁用第二项', type: 'boolean', defaultValue: false },
    { name: 'showDot', label: '展示红点', type: 'boolean', defaultValue: true },
  ],
} satisfies UsageConfig;
