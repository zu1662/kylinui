# Tab Bar 标签导航

Tab Bar 用于在同一页面内切换同级内容。项目较少时按固定数量等分，超过可见数量后可横向滚动，并让当前项保持在可视区域中。

## 使用建议

- 标签数量和文案应保持精简，禁用项不会触发切换事件。
- 组件使用 WAI-ARIA `tablist` / `tab` 语义，并支持键盘左右方向键切换。

## API

| 属性       | 类型               | 默认值       | 说明                         |
| ---------- | ------------------ | ------------ | ---------------------------- |
| modelValue | `string \| number` | -            | 当前项的值                   |
| current    | `string \| number` | `0`          | 当前项的兼容受控值           |
| data       | `TabBarItem[]`     | 必填         | 标签数据                     |
| fixedCount | `number`           | `4`          | 非滚动状态下的等分数量       |
| scrollable | `boolean`          | 自动判断     | 是否强制横向滚动             |
| animated   | `boolean`          | `true`       | 是否启用指示线位移和滚动动画 |
| ariaLabel  | `string`           | `'标签导航'` | 标签组的可访问名称           |

### TabBarItem

| 属性     | 类型               | 默认值   | 说明                                         |
| -------- | ------------------ | -------- | -------------------------------------------- |
| label    | `string`           | -        | 标签文案，优先级高于 `title`                 |
| title    | `string`           | -        | 标签文案                                     |
| value    | `string \| number` | 当前索引 | 标签值                                       |
| badge    | `string \| number` | -        | 徽标内容                                     |
| disabled | `boolean`          | `false`  | 是否禁用；禁用项不可点击、聚焦或通过键盘选中 |
| icon     | `string`           | -        | 图标名称                                     |

未提供 `value` 时使用索引作为当前值。若受控值指向禁用项，组件不会展示激活态或指示线。

## 事件

| 事件名            | 说明                   | 回调参数                                 |
| ----------------- | ---------------------- | ---------------------------------------- |
| update:modelValue | 当前项变化时触发       | `value: string \| number`                |
| update:current    | 当前项变化时同步兼容值 | `value: string \| number`                |
| change            | 成功切换当前项时触发   | `value, index: number, item: TabBarItem` |
| click             | 点击标签项时触发       | `item: TabBarItem, index: number`        |

## 插槽

| 名称 | 说明           | 插槽参数                          |
| ---- | -------------- | --------------------------------- |
| icon | 自定义标签图标 | `item: TabBarItem, index: number` |
