# Popover 气泡

Popover 在触发元素附近展示简短补充信息，可由点击触发或通过 `v-model` 手动控制。

## 使用建议

- 仅适合简短文案，复杂交互应使用 Action Sheet。
- 默认点击外部关闭；自定义结构使用 `content` 插槽，插槽内容优先于同名属性。

## API

| 属性           | 类型                                     | 默认值    | 说明             |
| -------------- | ---------------------------------------- | --------- | ---------------- |
| modelValue     | `boolean`                                | `false`   | 是否显示         |
| content        | `string`                                 | -         | 气泡提示文案     |
| placement      | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'`   | 展示方位         |
| trigger        | `'click' \| 'manual'`                    | `'click'` | 触发方式         |
| closeOnOutside | `boolean`                                | `true`    | 点击外部是否关闭 |
| closable       | `boolean`                                | `false`   | 是否显示关闭按钮 |

## 事件

| 事件名            | 说明               | 回调参数         |
| ----------------- | ------------------ | ---------------- |
| update:modelValue | 显示状态变化时触发 | `value: boolean` |

## 插槽

| 名称    | 说明                                                |
| ------- | --------------------------------------------------- |
| default | 触发元素，即需要被气泡包裹的内容                    |
| content | 自定义气泡内容；提供后覆盖 `content` 属性设置的文案 |
