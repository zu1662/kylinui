# Grid 宫格

Grid 以等宽列展示入口、工具或分类，GridItem 负责单个宫格项的图标、文字、徽标和链接。

## 使用建议

- 同一组宫格项保持相近的信息层级和文案长度。
- 需要页面跳转时可使用 `url`，应用内路由可通过 `click` 事件由业务处理。

## API

### Grid Props

| 属性      | 类型               | 默认值  | 说明                      |
| --------- | ------------------ | ------- | ------------------------- |
| columnNum | `number`           | `4`     | 每行列数                  |
| gutter    | `number \| string` | `0`     | 宫格间距，数字单位为 `px` |
| border    | `boolean`          | `true`  | 是否显示边框              |
| square    | `boolean`          | `false` | 是否保持宫格项为正方形    |
| center    | `boolean`          | `true`  | 是否居中排列宫格项内容    |
| clickable | `boolean`          | `false` | 是否为宫格项启用点击反馈  |

### GridItem Props

| 属性  | 类型               | 默认值  | 说明                 |
| ----- | ------------------ | ------- | -------------------- |
| text  | `string`           | `''`    | 宫格项文字           |
| icon  | `string`           | `''`    | KyIcon 字体图标名称  |
| badge | `string \| number` | `''`    | 图标右上角的徽标内容 |
| dot   | `boolean`          | `false` | 是否显示圆点徽标     |
| url   | `string`           | `''`    | 原生链接地址         |

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

| 名称    | 说明                 |
| ------- | -------------------- |
| icon    | 自定义图标内容       |
| default | 自定义文字或主体内容 |
