# Watermark 水印

用于在内容区域或整个页面上方重复展示文字、图片标记。水印层不响应指针事件，不会阻止下方内容交互。

## 基础用法

```vue
<KyWatermark content="内部资料">
  <article>需要添加标记的内容</article>
</KyWatermark>
```

## Props

| 属性     | 类型                 | 默认值           | 说明                                 |
| -------- | -------------------- | ---------------- | ------------------------------------ |
| content  | `string \| string[]` | `'Kylin Design'` | 水印文字，数组用于多行展示           |
| image    | `string`             | `''`             | 水印图片地址；设置后优先展示图片     |
| width    | `number`             | `120`            | 单个标记内容宽度                     |
| height   | `number`             | `64`             | 单个标记内容高度                     |
| gapX     | `number`             | `24`             | 水平间距                             |
| gapY     | `number`             | `24`             | 垂直间距                             |
| rotate   | `number`             | `-22`            | 旋转角度                             |
| opacity  | `number`             | `0.16`           | 透明度，自动限制在 0 到 1            |
| color    | `string`             | -                | 文字颜色；未设置时跟随当前主题文字色 |
| fontSize | `number`             | `14`             | 文字字号                             |
| zIndex   | `number`             | `1`              | 水印层层级                           |
| fullPage | `boolean`            | `false`          | 是否固定覆盖整个视口                 |

## 插槽

默认插槽用于放置需要添加水印的内容。
