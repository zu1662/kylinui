# Radio 单选框

Radio 用于在一组互斥选项中选择一个值，并保留字符串、数字或布尔值的原始类型。

## 使用建议

- 同一组单选项使用相同的 `name`，并提供清晰且互斥的标签。
- 选项较多或空间受限时，可考虑使用 Picker。

## API

| 属性       | 类型                          | 默认值  | 说明           |
| ---------- | ----------------------------- | ------- | -------------- |
| modelValue | `string \| number \| boolean` | -       | 当前选中值     |
| value      | `string \| number \| boolean` | 必填    | 当前选项值     |
| label      | `string`                      | 必填    | 选项标签       |
| name       | `string`                      | -       | 原生单选组名称 |
| disabled   | `boolean`                     | `false` | 是否禁用       |

## 事件

| 事件名            | 说明                 | 回调参数                             |
| ----------------- | -------------------- | ------------------------------------ |
| update:modelValue | 选中值变化时触发     | `value: string \| number \| boolean` |
| change            | 用户选择当前项时触发 | `value: string \| number \| boolean` |

## 插槽

| 名称    | 说明               |
| ------- | ------------------ |
| default | 自定义选项标签内容 |
