# Input 输入框

Input 提供标签、辅助信息、错误说明、长度约束、移动键盘提示和输入格式化能力，同时保留原生输入法与自动填充行为。

## 使用建议

- 错误原因应紧邻字段展示，组件会通过 `aria-describedby` 建立关联。
- 放入 FormItem 后，标签、辅助说明、错误状态、控件 ID、禁用与只读状态由表单上下文统一管理。
- 只读内容使用 `readonly`，不可操作字段使用 `disabled`。
- 格式化会避开中文输入法组合阶段，并根据格式化前的光标位置计算新位置。
- `modelValue` 运行时类型为 `number` 且未配置 formatter 时，输入内容以 `number` 值回写；字符串模型与清空输入保持字符串。

## API

| 属性          | 类型                        | 默认值       | 说明                                      |
| ------------- | --------------------------- | ------------ | ----------------------------------------- |
| modelValue    | `string \| number`          | `''`         | 输入值                                    |
| label         | `string`                    | -            | 字段标签                                  |
| placeholder   | `string`                    | -            | 占位文案                                  |
| helper        | `string`                    | -            | 辅助说明                                  |
| error         | `string`                    | -            | 错误说明                                  |
| disabled      | `boolean`                   | `false`      | 是否禁用                                  |
| readonly      | `boolean`                   | `false`      | 是否只读                                  |
| clearable     | `boolean`                   | `false`      | 是否允许清空                              |
| type          | `InputType`                 | `'text'`     | 原生输入类型                              |
| name          | `string`                    | -            | 原生字段名称                              |
| id            | `string`                    | -            | 原生控件 ID；FormItem 中默认使用上下文 ID |
| ariaLabel     | `string`                    | -            | 无可见标签时的可访问名称                  |
| maxLength     | `number`                    | -            | 最大输入长度                              |
| minLength     | `number`                    | -            | 最小输入长度                              |
| inputMode     | `InputMode`                 | -            | 移动端软键盘模式                          |
| autoComplete  | `string`                    | -            | 原生自动填充提示                          |
| enterKeyHint  | `InputEnterKeyHint`         | -            | 软键盘确认键提示                          |
| autofocus     | `boolean`                   | `false`      | 是否自动聚焦                              |
| showWordLimit | `boolean`                   | `false`      | 配置 `maxLength` 后是否显示字数           |
| formatter     | `(value: string) => string` | -            | 输入格式化函数                            |
| formatTrigger | `'onChange' \| 'onBlur'`    | `'onChange'` | 格式化触发时机                            |

## 事件

| 事件名            | 说明                 | 回调参数                  |
| ----------------- | -------------------- | ------------------------- |
| update:modelValue | 输入值变化时触发     | `value: string \| number` |
| focus             | 输入框获得焦点时触发 | `event: FocusEvent`       |
| blur              | 输入框失去焦点时触发 | `event: FocusEvent`       |
| clear             | 点击清空按钮时触发   | -                         |

## 方法

| 方法名 | 说明             |
| ------ | ---------------- |
| focus  | 聚焦原生输入框   |
| blur   | 取消输入框焦点   |
| select | 选中输入框内文本 |

## 插槽

| 名称   | 说明           |
| ------ | -------------- |
| prefix | 输入框前置内容 |
| suffix | 输入框后置内容 |
