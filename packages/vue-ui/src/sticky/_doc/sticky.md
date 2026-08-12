# Sticky 粘性布局

用于让筛选栏、分组标题或操作区在滚动到边界后保持可见。

## 基础用法

```vue
<KySticky :offset="8">
  <div>筛选条件</div>
</KySticky>
```

## Props

| 属性     | 类型     | 默认值    | 说明    |
| -------- | -------- | --------- | ------- |
| position | `'top'   | 'bottom'` | `'top'` | 固定位置                      |
| offset   | `number  | string`   | `0`     | 与边界的距离，数字单位为 `px` |
| zIndex   | `number` | `20`      | 层级    |

## 事件

固定状态变化时触发 `change`，参数为当前是否固定。

## 插槽

默认插槽接收 `stuck` 参数。
