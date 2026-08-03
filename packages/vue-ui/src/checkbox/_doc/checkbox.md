# Checkbox 复选框

复选框用于一个或多个可同时选择的选项。

## 使用建议

- 半选状态通过 aria-checked="mixed" 对辅助技术暴露。
- 多个复选项彼此独立，不用于表达互斥选择。

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | boolean | false | 是否选中 |
| label | string | - | 选项标签 |
| disabled | boolean | false | 是否禁用 |
| indeterminate | boolean | false | 是否为半选状态 |
