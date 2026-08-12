# Image 图片

用于展示图片，支持常用裁剪方式、尺寸、圆角、懒加载以及加载和异常占位内容。

## 基础用法

```vue
<KyImage src="/cover.jpg" alt="内容封面" width="160" height="112" fit="cover" />
```

## Props

| 属性           | 类型                                                       | 默认值     | 说明                      |
| -------------- | ---------------------------------------------------------- | ---------- | ------------------------- |
| src            | `string`                                                   | `''`       | 图片地址                  |
| alt            | `string`                                                   | `''`       | 图片替代文本              |
| fit            | `'contain' \| 'cover' \| 'fill' \| 'none' \| 'scale-down'` | `'fill'`   | 图片填充方式              |
| position       | `string`                                                   | `'center'` | 图片裁剪位置              |
| width          | `number \| string`                                         | -          | 容器宽度，数字单位为 `px` |
| height         | `number \| string`                                         | -          | 容器高度，数字单位为 `px` |
| radius         | `number \| string`                                         | -          | 圆角，数字单位为 `px`     |
| round          | `boolean`                                                  | `false`    | 是否显示为圆形            |
| block          | `boolean`                                                  | `false`    | 是否使用块级布局          |
| lazy           | `boolean`                                                  | `false`    | 是否进入可视区域后再加载  |
| showLoading    | `boolean`                                                  | `true`     | 是否展示加载状态          |
| showError      | `boolean`                                                  | `true`     | 是否展示异常状态          |
| crossorigin    | `ImgHTMLAttributes['crossorigin']`                         | -          | 原生图片跨域属性          |
| referrerpolicy | `ImgHTMLAttributes['referrerpolicy']`                      | -          | 原生图片来源策略          |
| decoding       | `ImgHTMLAttributes['decoding']`                            | `'async'`  | 原生图片解码策略          |

## 事件

- `load`：图片加载完成时触发，参数为原生事件。
- `error`：图片加载失败时触发，参数为原生事件。

## 插槽

提供 `loading` 和 `error` 插槽，用于定制状态内容。
