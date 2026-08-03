# Rating 评分器

评分器通过星级与数值输出收集用户评价。

## 使用建议

- 每颗星使用 radio 语义并提供明确分值标签。
- 只读和禁用状态都会阻止修改。

## API

| 属性       | 类型    | 默认值 | 说明       |
| ---------- | ------- | ------ | ---------- |
| modelValue | number  | 0      | 当前评分   |
| count      | number  | 5      | 星级数量   |
| readonly   | boolean | false  | 是否只读   |
| disabled   | boolean | false  | 是否禁用   |
| label      | string  | 评分   | 无障碍标签 |
