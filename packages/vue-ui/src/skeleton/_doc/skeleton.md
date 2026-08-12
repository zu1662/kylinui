# Skeleton 骨架屏

用于内容加载前提供与页面结构接近的占位，避免布局突然跳动。

## 基础用法

```vue
<KySkeleton title avatar :row="3" />
```

## Props

| 属性        | 类型      | 默认值    | 说明                   |
| ----------- | --------- | --------- | ---------------------- |
| loading     | `boolean` | `true`    | 是否显示骨架           |
| animate     | `boolean` | `true`    | 是否启用流光动画       |
| round       | `boolean` | `false`   | 行占位是否使用胶囊圆角 |
| title       | `boolean` | `false`   | 是否显示标题占位       |
| titleWidth  | `number   | string`   | `'40%'`                | 标题宽度，数字按百分比处理 |
| row         | `number`  | `3`       | 段落行数               |
| rowWidth    | `number   | string    | Array<number           | string>`                   | -   | 行宽，数字按百分比处理 |
| avatar      | `boolean` | `false`   | 是否显示头像占位       |
| avatarSize  | `number   | string`   | `40`                   | 头像尺寸，数字单位为 `px`  |
| avatarShape | `'round'  | 'square'` | `'round'`              | 头像形状                   |

加载结束后渲染默认插槽。系统减少动态效果时，流光动画会自动停用。
