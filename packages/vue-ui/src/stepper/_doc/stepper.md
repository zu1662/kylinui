# Stepper 步进器

Stepper 用于增加、减少或手动输入离散数值，适合人数、份数和条目数量等移动端表单场景。

## API

| 属性          | 类型      | 默认值   | 说明             |
| ------------- | --------- | -------- | ---------------- |
| modelValue    | `number`  | `0`      | 当前值           |
| min           | `number`  | `0`      | 最小值           |
| max           | `number`  | `99`     | 最大值           |
| step          | `number`  | `1`      | 步长             |
| disabled      | `boolean` | `false`  | 是否禁用         |
| readonly      | `boolean` | `false`  | 输入框是否只读   |
| inputAllowed  | `boolean` | `true`   | 是否允许手动输入 |
| decimalPlaces | `number`  | 自动推导 | 小数位数         |
| label         | `string`  | `'数量'` | 无障碍标签       |

## 事件

| 事件名            | 说明                         | 回调参数                    |
| ----------------- | ---------------------------- | --------------------------- |
| update:modelValue | 当前值变化时触发             | `value: number`             |
| change            | 任意有效变更完成时触发       | `value: number`             |
| minus             | 点击减少按钮并成功变更时触发 | `value: number`             |
| plus              | 点击增加按钮并成功变更时触发 | `value: number`             |
| overlimit         | 操作超出最小值或最大值时触发 | `direction: 'min' \| 'max'` |

## 行为说明

- 归一化逻辑以 `min` 为步长起点，支持非零最小值和小数步长。
- `inputAllowed` 与 `readonly` 可分别控制手动输入能力和原生只读状态。
