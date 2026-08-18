# Form 表单

Form 与 FormItem 负责组织字段、运行同步或异步校验、展示字段错误并管理提交状态。Input、Textarea 等字段组件放入 FormItem 后，会自动继承控件 ID、错误描述、禁用和只读状态。

## 使用建议

- 默认在失焦和提交时校验，避免用户尚未完成输入就显示错误；需要即时反馈的规则可单独使用 `trigger: 'onChange'`。
- 首次提交失败后默认滚动并聚焦第一个错误字段，可通过 `scrollToError`、`focusToError` 调整。
- `submitter` 执行期间表单进入提交状态，重复调用 `submit()` 会复用当前 Promise。
- 动态字段卸载后会从表单注册表移除，不再参与校验、重置或错误导航。
- 字段名支持 `user.name` 与 `items[0].name` 路径；`resetFields()` 会恢复字段挂载时捕获的深拷贝初值。
- 异步规则采用字段级校验序列号，较早返回的结果不会覆盖较新的输入状态。

## Form API

| 属性            | 类型              | 默认值                   | 说明                                 |
| --------------- | ----------------- | ------------------------ | ------------------------------------ |
| model           | `FormModel`       | -                        | 表单数据对象，必填                   |
| rules           | `FormRules`       | `{}`                     | 按字段名配置的校验规则               |
| validateTrigger | `FormRuleTrigger` | `['onBlur', 'onSubmit']` | 未单独配置规则触发时机时的默认策略   |
| scrollToError   | `boolean`         | `true`                   | 提交失败后是否滚动到首个错误字段     |
| focusToError    | `boolean`         | `true`                   | 提交失败后是否聚焦首个错误字段       |
| disabled        | `boolean`         | `false`                  | 是否禁用表单内支持上下文的字段       |
| readonly        | `boolean`         | `false`                  | 是否将表单内支持上下文的字段设为只读 |
| submitter       | `FormSubmitter`   | -                        | 校验通过后执行的同步或异步提交函数   |

## FormItem API

| 属性            | 类型              | 默认值  | 说明                               |
| --------------- | ----------------- | ------- | ---------------------------------- |
| name            | `string`          | -       | 字段路径；配置后参与校验和实例方法 |
| label           | `string`          | -       | 字段标签，并与内部控件程序化关联   |
| helper          | `string`          | -       | 字段辅助说明                       |
| rules           | `FormItemRules`   | -       | 当前字段的附加规则                 |
| validateTrigger | `FormRuleTrigger` | -       | 当前字段的默认校验触发时机         |
| required        | `boolean`         | `false` | 添加必填规则并显示必填标记         |

## 校验规则

| 字段      | 类型                                                            | 说明                                   |
| --------- | --------------------------------------------------------------- | -------------------------------------- |
| required  | `boolean`                                                       | 非空校验，空字符串和空数组视为空值     |
| minLength | `number`                                                        | 字符串或数组的最小长度                 |
| maxLength | `number`                                                        | 字符串或数组的最大长度                 |
| pattern   | `RegExp`                                                        | 正则校验，每次执行前会重置 `lastIndex` |
| message   | `string`                                                        | 规则失败时显示的文案                   |
| trigger   | `'onChange' \| 'onBlur' \| 'onSubmit' \| FormValidateTrigger[]` | 当前规则的触发时机                     |
| validator | `FormRuleValidator`                                             | 自定义同步或异步校验器                 |

自定义校验器接收当前值和 `{ name, model, rule }` 上下文。返回 `false` 或错误字符串表示失败，抛出的错误会转换为字段错误信息。

## Form 事件

| 事件名      | 说明                         | 回调参数                     |
| ----------- | ---------------------------- | ---------------------------- |
| submit      | `submitter` 成功完成后触发   | `values: FormModel`          |
| failed      | 校验未通过时触发             | `result: FormValidateResult` |
| validate    | 单个字段完成有效校验时触发   | `name, valid, message?`      |
| submitError | `submitter` 抛出或拒绝时触发 | `error: unknown`             |

## Form 默认插槽

| 参数          | 说明                             |
| ------------- | -------------------------------- |
| submitting    | 当前是否处于提交阶段             |
| submit        | 主动提交表单                     |
| validate      | 校验全部或指定字段               |
| resetFields   | 恢复全部或指定字段初值并清除错误 |
| clearValidate | 清除全部或指定字段错误           |

## FormItem 默认插槽

| 参数   | 说明                                       |
| ------ | ------------------------------------------ |
| error  | 当前错误文案                               |
| status | `idle`、`validating`、`success` 或 `error` |

## Form 实例方法

| 方法                          | 说明                                                   |
| ----------------------------- | ------------------------------------------------------ |
| validate(names?)              | 校验全部或指定字段，返回 `Promise<FormValidateResult>` |
| validateField(name)           | 校验单个字段                                           |
| resetFields(names?)           | 恢复全部或指定字段的挂载初值                           |
| clearValidate(names?)         | 清除全部或指定字段的校验状态                           |
| scrollToField(name, options?) | 将指定字段滚动到可视区域                               |
| submit()                      | 执行完整校验与提交，重复调用会复用进行中的任务         |
