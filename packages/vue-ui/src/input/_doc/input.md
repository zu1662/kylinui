# Input 输入框

Input 提供标签、辅助信息、错误说明和清空能力，同时保留原生输入法、自动填充和键盘行为。

## 使用建议

- 错误原因应紧邻字段展示，组件会通过 `aria-describedby` 建立关联。
- 只读内容使用 `readonly`，不可操作字段使用 `disabled`。

## API

| 属性        | 类型                                                   | 默认值   | 说明         |
| ----------- | ------------------------------------------------------ | -------- | ------------ |
| modelValue  | `string \| number`                                     | `''`     | 输入值       |
| label       | `string`                                               | -        | 字段标签     |
| placeholder | `string`                                               | -        | 占位文案     |
| helper      | `string`                                               | -        | 辅助说明     |
| error       | `string`                                               | -        | 错误说明     |
| disabled    | `boolean`                                              | `false`  | 是否禁用     |
| readonly    | `boolean`                                              | `false`  | 是否只读     |
| clearable   | `boolean`                                              | `false`  | 是否允许清空 |
| type        | `'text' \| 'tel' \| 'email' \| 'password' \| 'number'` | `'text'` | 原生输入类型 |
| name        | `string`                                               | -        | 原生字段名称 |

## 事件

| 事件名            | 说明                 | 回调参数            |
| ----------------- | -------------------- | ------------------- |
| update:modelValue | 输入值变化时触发     | `value: string`     |
| focus             | 输入框获得焦点时触发 | `event: FocusEvent` |
| blur              | 输入框失去焦点时触发 | `event: FocusEvent` |
| clear             | 点击清空按钮时触发   | -                   |

## 插槽

| 名称   | 说明           |
| ------ | -------------- |
| prefix | 输入框前置内容 |
| suffix | 输入框后置内容 |
