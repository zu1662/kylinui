# Grid 宫格

Grid 以等宽列展示入口、工具或分类，GridItem 负责单个宫格项的图标、文字、徽标、链接与自定义内容。

## 使用建议

- 同一组宫格项保持相近的信息层级和文案长度。
- 常规入口使用默认纵向布局，文字较短且需要提高横向利用率时可使用 `direction="horizontal"`。
- 需要页面跳转时可使用 `url`；应用内路由建议监听 `click` 事件并交由业务路由处理。
- 自定义卡片、图片等复杂内容时使用 GridItem 默认插槽，此时不会自动渲染图标与文字结构。

## API

### Grid Props

| 属性      | 类型                         | 默认值       | 说明                               |
| --------- | ---------------------------- | ------------ | ---------------------------------- |
| columnNum | `number \| string`           | `4`          | 每行列数，非法值回退为 `4`         |
| gutter    | `number \| string`           | `0`          | 宫格间距，数字单位为 `px`          |
| border    | `boolean`                    | `true`       | 是否显示边框                       |
| square    | `boolean`                    | `false`      | 是否保持宫格项为正方形             |
| center    | `boolean`                    | `true`       | 是否居中排列宫格项内容             |
| clickable | `boolean`                    | `false`      | 是否为宫格项启用点击反馈和键盘操作 |
| direction | `'vertical' \| 'horizontal'` | `'vertical'` | 图标与文字的排列方向               |
| reverse   | `boolean`                    | `false`      | 是否反转图标与文字的位置           |
| iconSize  | `number \| string`           | `28`         | 内置图标尺寸，数字单位为 `px`      |

### GridItem Props

| 属性  | 类型               | 默认值  | 说明                                |
| ----- | ------------------ | ------- | ----------------------------------- |
| text  | `string`           | `''`    | 宫格项文字                          |
| icon  | `string`           | `''`    | KyIcon 字体图标名称                 |
| badge | `string \| number` | `''`    | 图标右上角的徽标内容                |
| dot   | `boolean`          | `false` | 是否显示圆点徽标                    |
| url   | `string`           | `''`    | 原生链接地址；设置后渲染为 `a` 元素 |

## 事件

### GridItem Events

| 事件名 | 说明             | 回调参数            |
| ------ | ---------------- | ------------------- |
| click  | 点击宫格项时触发 | `event: MouseEvent` |

## 插槽

### Grid Slots

| 名称    | 说明       |
| ------- | ---------- |
| default | 宫格项列表 |

### GridItem Slots

| 名称    | 说明                                               |
| ------- | -------------------------------------------------- |
| default | 完全自定义宫格项内容；使用后不会渲染内置图标和文字 |
| icon    | 自定义图标内容，仍可配合 `badge`、`dot` 使用       |
| text    | 自定义文字内容                                     |

## CSS 变量

| 变量名                          | 默认值                                | 说明                   |
| ------------------------------- | ------------------------------------- | ---------------------- |
| `--ky-grid-item-bg`             | `var(--ky-color-surface)`             | 宫格项背景             |
| `--ky-grid-item-active-bg`      | `var(--ky-color-subtle-bg)`           | 点击反馈背景           |
| `--ky-grid-item-padding`        | `var(--ky-space-4) var(--ky-space-2)` | 内容内边距             |
| `--ky-grid-item-min-height`     | `96px`                                | 非正方形宫格项最小高度 |
| `--ky-grid-item-text-color`     | `var(--ky-color-text-primary)`        | 文字颜色               |
| `--ky-grid-item-text-font-size` | `var(--ky-font-size-assist)`          | 文字字号               |
| `--ky-grid-item-gap`            | `var(--ky-space-2)`                   | 图标与文字间距         |
