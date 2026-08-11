# Checkbox 复选框

Checkbox 用于一个或多个可同时选择的选项，并支持禁用和半选状态。

## 使用建议

- 半选状态会通过 `aria-checked="mixed"` 暴露给辅助技术。
- 多个复选项彼此独立，不用于表达互斥选择。

## API

| 属性          | 类型      | 默认值  | 说明           |
| ------------- | --------- | ------- | -------------- |
| modelValue    | `boolean` | `false` | 是否选中       |
| label         | `string`  | 必填    | 选项标签       |
| disabled      | `boolean` | `false` | 是否禁用       |
| indeterminate | `boolean` | `false` | 是否为半选状态 |

## 事件

| 事件名            | 说明                   | 回调参数         |
| ----------------- | ---------------------- | ---------------- |
| update:modelValue | 选中状态变化时触发     | `value: boolean` |
| change            | 用户切换选中状态时触发 | `value: boolean` |

## 插槽

| 名称    | 说明               |
| ------- | ------------------ |
| default | 自定义选项标签内容 |
