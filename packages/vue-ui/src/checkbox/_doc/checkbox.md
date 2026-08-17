# Checkbox 复选框

Checkbox 用于独立布尔选择；CheckboxGroup 用于维护一组选项值，并统一处理禁用、排列方向和最大选择数。

## 使用建议

- 文案和控件整体均可点击，禁用项不会参与选择或全选。
- 分组场景为每个 Checkbox 配置唯一的 `value`，由 CheckboxGroup 统一维护数组值。
- 父级禁用会覆盖子项状态；`max` 只限制新增选择，不会静默删除外部传入的受控值。

## Checkbox API

| 属性          | 类型               | 默认值  | 说明                 |
| ------------- | ------------------ | ------- | -------------------- |
| modelValue    | `boolean`          | `false` | 独立使用时的选中状态 |
| value         | `string \| number` | -       | 分组使用时的选项值   |
| label         | `string`           | 必填    | 选项标签             |
| name          | `string`           | -       | 原生字段名称         |
| disabled      | `boolean`          | `false` | 是否禁用             |
| indeterminate | `boolean`          | `false` | 是否显示半选状态     |

## CheckboxGroup API

| 属性       | 类型                         | 默认值       | 说明               |
| ---------- | ---------------------------- | ------------ | ------------------ |
| modelValue | `Array<string \| number>`    | `[]`         | 当前选中值         |
| disabled   | `boolean`                    | `false`      | 是否禁用全部子项   |
| direction  | `'horizontal' \| 'vertical'` | `'vertical'` | 排列方向           |
| max        | `number`                     | -            | 最大选择数         |
| name       | `string`                     | -            | 子项共享的原生名称 |
| ariaLabel  | `string`                     | -            | 分组无障碍名称     |

## 事件

### Checkbox

| 事件名            | 说明                   | 回调参数         |
| ----------------- | ---------------------- | ---------------- |
| update:modelValue | 独立选中状态变化时触发 | `value: boolean` |
| change            | 用户切换当前项时触发   | `value: boolean` |

### CheckboxGroup

| 事件名            | 说明                    | 回调参数                 |
| ----------------- | ----------------------- | ------------------------ |
| update:modelValue | 选中集合变化时触发      | `value: CheckboxValue[]` |
| change            | 用户完成有效选择时触发  | `value: CheckboxValue[]` |
| overlimit         | 新增选择超过 max 时触发 | `value: CheckboxValue`   |

## CheckboxGroup 方法

| 方法名    | 说明                                           |
| --------- | ---------------------------------------------- |
| toggleAll | 全选或取消全选；跳过并保留禁用项，且遵守 `max` |

## 插槽

| 组件          | 名称    | 说明               |
| ------------- | ------- | ------------------ |
| Checkbox      | default | 自定义选项标签内容 |
| CheckboxGroup | default | 放置 Checkbox 子项 |
