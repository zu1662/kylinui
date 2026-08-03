# Slider 滑动选择器

滑动选择器用于在连续或分段范围内快速选择数值。

## 使用建议

- 基于原生 range，支持方向键调整。
- 范围为零时进度安全回退为 0，避免无效样式值。

## API

| 属性       | 类型    | 默认值 | 说明           |
| ---------- | ------- | ------ | -------------- |
| modelValue | number  | 0      | 当前值         |
| min        | number  | 0      | 最小值         |
| max        | number  | 100    | 最大值         |
| step       | number  | 1      | 步长           |
| label      | string  | 数值   | 字段标签       |
| showValue  | boolean | true   | 是否显示当前值 |
| disabled   | boolean | false  | 是否禁用       |
