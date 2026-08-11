# Slider 滑动选择器

Slider 用于在连续或分段范围内选择数值，基于原生 range 保留键盘和辅助技术能力。

## 使用建议

- 设置清晰的 `min`、`max` 和 `step`，避免产生业务不支持的数值。
- 范围为零时进度会安全回退为 0，避免无效样式值。

## API

| 属性       | 类型      | 默认值   | 说明           |
| ---------- | --------- | -------- | -------------- |
| modelValue | `number`  | `0`      | 当前值         |
| min        | `number`  | `0`      | 最小值         |
| max        | `number`  | `100`    | 最大值         |
| step       | `number`  | `1`      | 步长           |
| label      | `string`  | `'数值'` | 字段标签       |
| showValue  | `boolean` | `true`   | 是否显示当前值 |
| disabled   | `boolean` | `false`  | 是否禁用       |

## 事件

| 事件名            | 说明               | 回调参数        |
| ----------------- | ------------------ | --------------- |
| update:modelValue | 当前值变化时触发   | `value: number` |
| change            | 用户调整数值时触发 | `value: number` |
