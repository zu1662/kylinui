import type { UsageConfig } from '../../usage';

export default {
  name: 'NumberKeyboard 数字键盘',
  component: 'KyNumberKeyboard',
  description: '用于金额、验证码与纯数字信息的安全录入。',
  props: [
    {
      name: 'theme',
      label: '键盘布局',
      type: 'select',
      defaultValue: 'default',
      options: ['default', 'custom'],
    },
    {
      name: 'title',
      label: '顶部提示',
      type: 'text',
      defaultValue: '请输入支付金额',
    },
    {
      name: 'extraKey',
      label: '额外按键',
      type: 'text',
      defaultValue: '.',
    },
    {
      name: 'closeText',
      label: '关闭文案',
      type: 'text',
      defaultValue: '完成',
    },
    {
      name: 'maxlength',
      label: '最大长度',
      type: 'number',
      defaultValue: 8,
      min: 0,
      max: 20,
      step: 1,
    },
    {
      name: 'randomKeyOrder',
      label: '随机数字顺序',
      type: 'boolean',
      defaultValue: false,
    },
    {
      name: 'showDeleteKey',
      label: '显示删除键',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'hideOnClickOutside',
      label: '点击外部关闭',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'disabled',
      label: '禁用按键',
      type: 'boolean',
      defaultValue: false,
    },
  ],
} satisfies UsageConfig;
