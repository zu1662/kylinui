# Skeleton 骨架屏

用于内容加载前提供稳定的结构占位。组件提供头像、标题、段落、列表等有限预设，也保留可组合的自定义模式。

## 基础用法

```vue
<KySkeleton preset="paragraph" />
```

## 有限预设

```vue
<KySkeleton preset="avatar" />
<KySkeleton preset="title" />
<KySkeleton preset="paragraph" />
<KySkeleton preset="list" :list-count="3" />
```

预设语义如下：

- `avatar`：单个头像占位，不渲染标题和段落行。
- `title`：单个标题占位，不渲染头像和段落行。
- `paragraph`：固定三行段落占位。
- `list`：重复渲染头像、标题和两行段落，数量由 `listCount` 控制。
- `custom`：使用 `avatar`、`title`、`row` 等属性自行组合。

## 加载完成内容

```vue
<KySkeleton :loading="loading" preset="list">
  <ArticleList />
</KySkeleton>
```

`loading` 变为 `false` 后，组件渲染默认插槽。

## API

### Props

| 属性        | 类型                                                       | 默认值     | 说明                                           |
| ----------- | ---------------------------------------------------------- | ---------- | ---------------------------------------------- |
| loading     | `boolean`                                                  | `true`     | 是否显示骨架；关闭后渲染默认插槽               |
| animate     | `boolean`                                                  | `true`     | 是否启用 CSS 流光动画                          |
| preset      | `'custom' \| 'avatar' \| 'title' \| 'paragraph' \| 'list'` | `'custom'` | 有限结构预设                                   |
| listCount   | `number`                                                   | `3`        | `list` 预设的列表项数量，最少为 1              |
| round       | `boolean`                                                  | `false`    | 标题和段落行是否使用胶囊圆角                   |
| title       | `boolean`                                                  | `false`    | `custom` 模式是否显示标题占位                  |
| titleWidth  | `number \| string`                                         | `'40%'`    | 标题宽度，数字按百分比处理                     |
| row         | `number`                                                   | `3`        | `custom` 模式的段落行数                        |
| rowWidth    | `number \| string \| Array<number \| string>`              | -          | 行宽；数字按百分比处理，数组不足时复用最后一项 |
| avatar      | `boolean`                                                  | `false`    | `custom` 模式是否显示头像占位                  |
| avatarSize  | `number \| string`                                         | `40`       | 头像尺寸，数字单位为 `px`                      |
| avatarShape | `'round' \| 'square'`                                      | `'round'`  | 头像形状                                       |

### 插槽

| 名称    | 说明                                  |
| ------- | ------------------------------------- |
| default | `loading` 为 `false` 时展示的真实内容 |

流光完全由 CSS 动画实现，不会为骨架节点创建 JavaScript 定时器；系统启用 `prefers-reduced-motion: reduce` 时动画会自动停用。
