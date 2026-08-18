import type { UsageConfig } from '../../usage';

export default {
  name: 'ConfigProvider 全局配置',
  component: 'KyConfigProvider',
  description: '切换主题与层级，并体验 locale、服务默认值和默认 Teleport 容器。',
  codeTitle: 'Vue Template',
  props: [
    {
      name: 'theme',
      label: '主题',
      type: 'select',
      defaultValue: 'jade',
      options: ['jade', 'ocean', 'sunset', 'midnight'],
    },
    {
      name: 'themeVarsScope',
      label: '变量作用域',
      type: 'select',
      defaultValue: 'local',
      options: ['local', 'global'],
    },
    { name: 'zIndex', label: '浮层起始层级', type: 'number', defaultValue: 900, min: 1, max: 5000 },
  ],
} satisfies UsageConfig;
