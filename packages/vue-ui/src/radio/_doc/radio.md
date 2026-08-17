# Radio 单选框

Radio 用于互斥选项；RadioGroup 统一维护受控值、原生分组名称、禁用状态和排列方向。

## 使用建议

- 同一组选项放入 RadioGroup，不需要为每个子项重复维护 `modelValue` 和 `name`。
- 选项较多或空间受限时，可考虑使用 Picker。

## Radio API

| 属性       | 类型                          | 默认值  | 说明                     |
| ---------- | ----------------------------- | ------- | ------------------------ |
| modelValue | `string \| number \| boolean` | -       | 独立使用时的当前选中值   |
| value      | `string \| number \| boolean` | 必填    | 当前选项值               |
| label      | `string`                      | 必填    | 选项标签                 |
| name       | `string`                      | -       | 独立使用时的原生分组名称 |
| disabled   | `boolean`                     | `false` | 是否禁用                 |

## RadioGroup API

| 属性       | 类型                          | 默认值       | 说明                   |
| ---------- | ----------------------------- | ------------ | ---------------------- |
| modelValue | `string \| number \| boolean` | -            | 当前选中值             |
| name       | `string`                      | 自动生成     | 子项共享的原生分组名称 |
| disabled   | `boolean`                     | `false`      | 是否禁用全部子项       |
| direction  | `'horizontal' \| 'vertical'`  | `'vertical'` | 排列方向               |
| ariaLabel  | `string`                      | -            | 分组无障碍名称         |

## 事件

### Radio

| 事件名            | 说明                 | 回调参数            |
| ----------------- | -------------------- | ------------------- |
| update:modelValue | 独立选中值变化时触发 | `value: RadioValue` |
| change            | 用户选择当前项时触发 | `value: RadioValue` |

### RadioGroup

| 事件名            | 说明                 | 回调参数            |
| ----------------- | -------------------- | ------------------- |
| update:modelValue | 分组选中值变化时触发 | `value: RadioValue` |
| change            | 用户选择子项时触发   | `value: RadioValue` |

## 插槽

| 组件       | 名称    | 说明               |
| ---------- | ------- | ------------------ |
| Radio      | default | 自定义选项标签内容 |
| RadioGroup | default | 放置 Radio 子项    |
