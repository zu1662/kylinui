import type { UsageConfig } from '../../usage';

// 配置项由文档站读取，用于生成实时预览控件与 Vue Template。
export default {
  name: 'Bottom Sheet 底部浮层',
  component: 'KyBottomSheet',
  description: '从底部承载筛选、选择与补充操作，并适配底部安全区。',
  props: [
    {
      name: 'title',
      label: '标题',
      type: 'text',
      defaultValue: '请选择'
    },
    {
      name: 'height',
      label: '最大高度',
      type: 'text',
      defaultValue: '80vh'
    },
    {
      name: 'showClose',
      label: '关闭按钮',
      type: 'boolean',
      defaultValue: true
    },
    {
      name: 'closeOnOverlay',
      label: '遮罩关闭',
      type: 'boolean',
      defaultValue: true
    }
  ]
} satisfies UsageConfig;
