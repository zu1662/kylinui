import type { UsageConfig } from '../../usage';

// 配置项由文档站读取，用于生成实时预览控件与 Vue Template。
export default {
  name: 'Dialog 对话框',
  component: 'KyDialog',
  description: '用于重要确认、风险告知或需要明确决策的场景。',
  props: [
    {
      name: 'title',
      label: '标题',
      type: 'text',
      defaultValue: '确认操作'
    },
    {
      name: 'description',
      label: '说明',
      type: 'text',
      defaultValue: '请确认是否继续当前操作。'
    },
    {
      name: 'showCancel',
      label: '取消按钮',
      type: 'boolean',
      defaultValue: true
    },
    {
      name: 'danger',
      label: '危险操作',
      type: 'boolean',
      defaultValue: false
    },
    {
      name: 'loading',
      label: '确认中',
      type: 'boolean',
      defaultValue: false
    },
    {
      name: 'closeOnOverlay',
      label: '遮罩关闭',
      type: 'boolean',
      defaultValue: false
    }
  ]
} satisfies UsageConfig;
