# Stepper 步进器

步进器用于调整离散数量，支持按钮与手动输入。

## 使用建议

- 所有输入统一按最小值、最大值和步长归一化。
- 到达边界后对应按钮自动禁用。

## API

| 属性       | 类型    | 默认值 | 说明       |
| ---------- | ------- | ------ | ---------- |
| modelValue | number  | 0      | 当前值     |
| min        | number  | 0      | 最小值     |
| max        | number  | 99     | 最大值     |
| step       | number  | 1      | 步长       |
| disabled   | boolean | false  | 是否禁用   |
| label      | string  | 数量   | 无障碍标签 |
