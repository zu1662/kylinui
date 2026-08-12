# BackTop 返回顶部

用于长页面或滚动容器，超过指定距离后提供快速返回顶部入口。

## 基础用法

```vue
<KyBackTop :offset="200" />
```

通过 `target` 传入选择器、滚动元素或 `Window` 可绑定指定滚动目标。

## Props

| 属性     | 类型     | 默认值      | 说明                          |
| -------- | -------- | ----------- | ----------------------------- |
| target   | `string  | HTMLElement | Window`                       | `Window`                          | 滚动目标 |
| right    | `number  | string`     | `24`                          | 与视口右侧的距离，数字单位为 `px` |
| bottom   | `number  | string`     | `40`                          | 与视口底部的距离，数字单位为 `px` |
| offset   | `number` | `200`       | 展示入口所需的滚动距离        |
| duration | `number` | `300`       | 返回顶部动画时长，单位为 `ms` |
| zIndex   | `number` | `30`        | 层级                          |

## 事件

| 事件名 | 参数         | 说明           |
| ------ | ------------ | -------------- |
| click  | `MouseEvent` | 点击入口时触发 |

## 插槽

| 名称    | 说明           |
| ------- | -------------- |
| default | 自定义按钮内容 |
