# Stepper 步进器

Stepper 用于增加、减少或手动输入离散数值，适合人数、份数、行李件数等移动端表单场景。

## API

| 属性          | 类型    | 默认值   | 说明             |
| ------------- | ------- | -------- | ---------------- |
| modelValue    | number  | 0        | 当前值           |
| min           | number  | 0        | 最小值           |
| max           | number  | 99       | 最大值           |
| step          | number  | 1        | 步长             |
| decimalPlaces | number  | 自动推导 | 小数位数         |
| inputAllowed  | boolean | true     | 是否允许手动输入 |
| readonly      | boolean | false    | 输入框是否只读   |
| disabled      | boolean | false    | 是否禁用         |
| label         | string  | 数量     | 无障碍标签       |

## 行为说明

- 归一化逻辑以 `min` 为步长起点，正确支持非零最小值和小数步长。
- `inputAllowed` 与 `readonly` 可分别控制手动输入能力和原生只读状态。
- 点击减少、增加按钮分别触发 `minus` / `plus`，所有有效变更都会触发 `change`。
- 达到边界时触发 `overlimit`，参数为 `min` 或 `max`。
