import type { UsageConfig } from '../../usage';
export default {
  name: 'Progress 进度条',
  component: 'KyProgress',
  description: '展示任务、上传或流程的线性进度。',
  props: [
    { name: 'percentage', label: '进度', type: 'number', defaultValue: 56, min: 0, max: 100 },
    { name: 'strokeWidth', label: '线宽', type: 'number', defaultValue: 8, min: 4, max: 20 },
    { name: 'showPivot', label: '显示进度文字', type: 'boolean', defaultValue: true },
    { name: 'inactive', label: '置灰', type: 'boolean', defaultValue: false },
  ],
} satisfies UsageConfig;
