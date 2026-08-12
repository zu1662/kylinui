# Circle 环形进度

用于以紧凑图形展示完成度，支持自定义尺寸、线宽、方向与中心内容。

## 基础用法

```vue
<KyCircle :percentage="65" />
```

## Props

| 属性        | 类型      | 默认值  | 说明                      |
| ----------- | --------- | ------- | ------------------------- |
| percentage  | `number`  | `0`     | 进度，自动限制在 0 到 100 |
| size        | `number   | string` | `100`                     | 环形尺寸，数字单位为 `px` |
| strokeWidth | `number`  | `8`     | 轨道线宽                  |
| color       | `string`  | -       | 进度颜色                  |
| trackColor  | `string`  | -       | 轨道颜色                  |
| clockwise   | `boolean` | `true`  | 是否顺时针绘制            |
| showText    | `boolean` | `true`  | 是否显示默认百分比        |

## 插槽

默认插槽接收 `percentage` 参数，可用于定制中心内容。
