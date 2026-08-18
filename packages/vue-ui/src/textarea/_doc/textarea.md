# Textarea 多行输入框

Textarea 用于输入备注、描述等多行内容，支持自动高度、最大长度、字数统计、错误描述和中文输入法组合阶段保护。

## 使用建议

- 短文本优先使用 Input，内容可能超过一行时使用 Textarea。
- `autosize` 为 `true` 时从 `rows` 开始扩展；传入 `{ minRows, maxRows }` 可限制范围，达到最大高度后内部滚动。
- 字数统计需要同时配置 `maxLength` 与 `showWordLimit`。
- 放入 FormItem 后会继承控件 ID、错误描述、禁用与只读状态，标签和错误信息由 FormItem 统一渲染。
- 中文输入法组合阶段不会提前更新模型，组合结束后只提交一次最终文本。

## API

| 属性          | 类型                                                | 默认值  | 说明                                      |
| ------------- | --------------------------------------------------- | ------- | ----------------------------------------- |
| modelValue    | `string`                                            | `''`    | 输入值                                    |
| label         | `string`                                            | -       | 独立使用时的字段标签                      |
| placeholder   | `string`                                            | -       | 占位文案                                  |
| helper        | `string`                                            | -       | 独立使用时的辅助说明                      |
| error         | `string`                                            | -       | 独立使用时的错误说明                      |
| disabled      | `boolean`                                           | `false` | 是否禁用                                  |
| readonly      | `boolean`                                           | `false` | 是否只读                                  |
| name          | `string`                                            | -       | 原生字段名称                              |
| id            | `string`                                            | -       | 原生控件 ID；FormItem 中默认使用上下文 ID |
| ariaLabel     | `string`                                            | -       | 无可见标签时的可访问名称                  |
| rows          | `number`                                            | `3`     | 原生基础行数                              |
| maxLength     | `number`                                            | -       | 最大输入长度                              |
| minLength     | `number`                                            | -       | 最小输入长度                              |
| inputMode     | `InputMode`                                         | -       | 移动端软键盘模式                          |
| autoComplete  | `string`                                            | -       | 原生自动填充提示                          |
| enterKeyHint  | `InputEnterKeyHint`                                 | -       | 软键盘确认键提示                          |
| autofocus     | `boolean`                                           | `false` | 是否自动聚焦                              |
| showWordLimit | `boolean`                                           | `false` | 是否显示字数统计                          |
| autosize      | `boolean \| { minRows?: number; maxRows?: number }` | `false` | 是否自动调整高度                          |

## 事件

| 事件名            | 说明             | 回调参数            |
| ----------------- | ---------------- | ------------------- |
| update:modelValue | 输入值变化时触发 | `value: string`     |
| focus             | 获得焦点时触发   | `event: FocusEvent` |
| blur              | 失去焦点时触发   | `event: FocusEvent` |

## 方法

| 方法名 | 说明               |
| ------ | ------------------ |
| focus  | 聚焦原生多行输入框 |
| blur   | 取消焦点           |
| select | 选中全部文本       |
