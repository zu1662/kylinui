import type { UsageConfig } from '../../usage';
export default {
  name: 'BackTop 返回顶部',
  component: 'KyBackTop',
  description: '滚动超过指定距离后展示固定入口，并平滑返回容器顶部。',
  props: [
    { name: 'offset', label: '出现距离', type: 'number', defaultValue: 80, min: 0, max: 500 },
    { name: 'right', label: '右侧距离', type: 'number', defaultValue: 20, min: 0, max: 80 },
    { name: 'bottom', label: '底部距离', type: 'number', defaultValue: 24, min: 0, max: 120 },
    { name: 'duration', label: '滚动时长', type: 'number', defaultValue: 300, min: 0, max: 1000 },
  ],
} satisfies UsageConfig;
