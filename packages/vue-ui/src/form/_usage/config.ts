import type { UsageConfig } from '../../usage';

function toBooleanAttribute(name: string, enabled: unknown) {
  return enabled ? `  :${name}="true"` : `  :${name}="false"`;
}

export default {
  name: 'Form 表单',
  component: 'KyForm',
  description: '组合字段、校验规则、错误导航和异步提交状态的移动端表单容器。',
  props: [
    {
      name: 'scrollToError',
      label: '滚动到错误项',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'focusToError',
      label: '聚焦错误项',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'disabled',
      label: '整体禁用',
      type: 'boolean',
      defaultValue: false,
    },
    {
      name: 'readonly',
      label: '整体只读',
      type: 'boolean',
      defaultValue: false,
    },
  ],
  generateCode: (values) =>
    [
      '<KyForm',
      '  :model="model"',
      '  :rules="rules"',
      toBooleanAttribute('scroll-to-error', values.scrollToError),
      toBooleanAttribute('focus-to-error', values.focusToError),
      toBooleanAttribute('disabled', values.disabled),
      toBooleanAttribute('readonly', values.readonly),
      '  @submit="save"',
      '>',
      '  <KyFormItem name="name" label="联系人">',
      '    <KyInput v-model="model.name" placeholder="请输入联系人" />',
      '  </KyFormItem>',
      '  <KyButton native-type="submit">提交</KyButton>',
      '</KyForm>',
    ].join('\n'),
} satisfies UsageConfig;
