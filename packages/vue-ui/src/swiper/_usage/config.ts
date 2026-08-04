import type { UsageConfig } from '../../usage';

export default {
  name: 'Swiper 轮播',
  component: 'KySwiper',
  description: '支持自动播放、循环、卡片缩放和真实触摸拖动的移动端轮播组件。',
  props: [
    { name: 'loop', label: '循环播放', type: 'boolean', defaultValue: true },
    { name: 'autoplay', label: '自动播放', type: 'boolean', defaultValue: false },
    { name: 'showDots', label: '显示指示点', type: 'boolean', defaultValue: true },
    { name: 'touchable', label: '允许拖动', type: 'boolean', defaultValue: true },
    {
      name: 'scale',
      label: '卡片宽度比例',
      type: 'number',
      defaultValue: 1,
      min: 0.7,
      max: 1,
      step: 0.05,
    },
    { name: 'gap', label: '卡片间距', type: 'number', defaultValue: 0, min: 0, max: 24, step: 4 },
  ],
} satisfies UsageConfig;
