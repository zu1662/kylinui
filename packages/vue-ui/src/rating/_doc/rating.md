# Rating 评分器

Rating 用于选择或展示离散评分，默认以五个星级按钮呈现当前分值。

## 使用建议

- `readonly` 用于只读展示，`disabled` 用于表达当前不可操作状态。
- 评分项使用单选语义，并为每个分值提供可访问名称。

## API

| 属性       | 类型      | 默认值   | 说明               |
| ---------- | --------- | -------- | ------------------ |
| modelValue | `number`  | `0`      | 当前评分           |
| count      | `number`  | `5`      | 评分项数量         |
| readonly   | `boolean` | `false`  | 是否只读           |
| disabled   | `boolean` | `false`  | 是否禁用           |
| label      | `string`  | `'评分'` | 评分组的可访问名称 |

## 事件

| 事件名            | 说明               | 回调参数        |
| ----------------- | ------------------ | --------------- |
| update:modelValue | 评分变化时触发     | `value: number` |
| change            | 用户选择评分时触发 | `value: number` |
