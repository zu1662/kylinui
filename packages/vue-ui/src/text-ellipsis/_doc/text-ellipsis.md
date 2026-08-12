# TextEllipsis 文本省略

用于按行数收起长文本。组件会在内容或容器尺寸变化时重新测量，仅在确实溢出时展示操作按钮。

## 基础用法

```vue
<KyTextEllipsis :content="description" :rows="3" />
```

## Props

| 属性         | 类型      | 默认值   | 说明                       |
| ------------ | --------- | -------- | -------------------------- |
| content      | `string`  | `''`     | 文本内容                   |
| rows         | `number`  | `3`      | 收起时展示的行数，最小为 1 |
| dots         | `string`  | `'…'`    | 收起状态末尾标记           |
| expandText   | `string`  | `'展开'` | 展开按钮文字               |
| collapseText | `string`  | `'收起'` | 收起按钮文字               |
| expandable   | `boolean` | `true`   | 是否允许展开和收起         |

## 事件

- `change`：展开状态变化时触发，参数为当前是否展开。

## 实例方法

- `toggle(expanded?)`：切换状态，也可传入目标展开状态。
