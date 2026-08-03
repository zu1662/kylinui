import type { UsageConfig } from '../../usage';

// 配置项由文档站读取，用于生成实时预览控件与 Vue Template。
export default {
  name: 'Toast 轻提示',
  component: 'KyToast',
  description: '提供低打断的全局结果反馈，同一时间仅显示一条。',
  codeTitle: 'Composition API',
  // Toast 通过全局方法触发，代码示例必须与真实调用方式一致。
  generateCode(values) {
    // 服务调用同样使用稳定的两空格缩进，保证展示和复制结果一致。
    return [
      'showToast({',
      `  type: ${JSON.stringify(String(values.type))},`,
      `  message: ${JSON.stringify(String(values.message))},`,
      '});',
    ].join('\n');
  },
  props: [
    {
      name: 'type',
      label: '类型',
      type: 'select',
      defaultValue: 'success',
      options: ['text', 'success', 'error', 'loading'],
    },
    {
      name: 'message',
      label: '文案',
      type: 'text',
      defaultValue: '操作成功',
    },
  ],
} satisfies UsageConfig;
