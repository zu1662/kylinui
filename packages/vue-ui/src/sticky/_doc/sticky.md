# Sticky 粘性布局

用于让筛选栏、分组标题或操作区在滚动到边界后保持可见。组件会自动以最近的可滚动祖先元素作为滚动容器；未找到时以窗口作为滚动容器。

## 基础用法

内容滚动到容器顶部后保持可见。

```vue
<KySticky>
  <div>基础用法</div>
</KySticky>
```

## 吸顶距离

通过 `offset` 设置内容与顶部边界的距离，数字值的单位为 `px`。

```vue
<KySticky :offset="50">
  <div>距离顶部 50px</div>
</KySticky>
```

## 滚动容器

将组件放入设置了 `overflow-y: auto` 或 `overflow-y: scroll` 的容器后，粘性状态会以该容器的内边界为准。

```vue
<div class="scroll-container">
  <KySticky :offset="8">
    <div>容器内吸顶</div>
  </KySticky>
</div>
```

## 吸底距离

将 `position` 设置为 `bottom`，可使内容在滚动到容器底部边界时保持可见。

```vue
<KySticky position="bottom" :offset="50">
  <div>距离底部 50px</div>
</KySticky>
```

## Props

| 属性     | 类型     | 默认值    | 说明           |
| -------- | -------- | --------- | -------------- |
| position | `'top'   | 'bottom'` | `'top'`        | 固定位置                          |
| offset   | `number  | string`   | `0`            | 与对应边界的距离，数字单位为 `px` |
| zIndex   | `number` | `20`      | 粘性内容的层级 |

## 事件

| 事件名 | 参数             | 说明               |
| ------ | ---------------- | ------------------ |
| change | `stuck: boolean` | 固定状态变化时触发 |

## 插槽

| 插槽名  | 参数             | 说明                         |
| ------- | ---------------- | ---------------------------- |
| default | `stuck: boolean` | 粘性内容，可获取当前固定状态 |
