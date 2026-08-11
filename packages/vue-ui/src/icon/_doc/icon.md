# Icon 图标

Icon 统一支持内置线性 SVG 和随组件库本地打包的 Iconfont（Project id 2722740），无需运行时请求远程资源。

## 基础用法

```vue
<KyIcon name="chevron-right" />
<KyIcon name="warning" color="#c73851" :size="24" />
<KyIcon name="loading" source="iconfont" spin label="加载中" />
```

`source` 默认为 `auto`：名称匹配内置 SVG 时优先渲染 SVG，否则自动查找 Iconfont。若两套图标存在同名项，可通过 `source="svg"` 或 `source="iconfont"` 精确指定。

字体文件使用独立的 `KyIconFont` 字体族和 `ky-icon-font` 样式前缀，不会覆盖宿主项目的 `.iconfont` 或 `.icon-*` 规则。纯装饰图标默认对读屏隐藏，传入 `label` 后会以图片语义暴露可访问名称。

## API

| 属性        | 类型                  | 默认值       | 说明                                     |
| ----------- | --------------------- | ------------ | ---------------------------------------- |
| name        | string                | 必填         | SVG 或 Iconfont 图标名称                 |
| source      | auto / svg / iconfont | auto         | 图标来源；auto 优先 SVG，再匹配 Iconfont |
| size        | number / string       | 20           | 图标尺寸，数字自动转换为 `px`            |
| color       | string                | currentColor | 图标颜色                                 |
| strokeWidth | number                | 2            | SVG 图标线条宽度                         |
| rotate      | number                | 0            | 静态旋转角度                             |
| spin        | boolean               | false        | 是否持续旋转                             |
| label       | string                | -            | 可访问名称；未提供时作为装饰图标隐藏     |

内置 SVG 图标集合：`chevron-right`、`chevron-left`、`chevron-down`、`chevron-up`、`close`、`check`、`check-circle`、`circle`、`info`、`help`、`plus`、`calendar`、`trash`、`edit`、`copy`、`bell`、`speaker`。

字体图标的完整集合已在上方基础示例中展示，也可通过导出的 `iconfontNames` 获取。

## 插槽

| 名称    | 说明                                                 |
| ------- | ---------------------------------------------------- |
| default | 传入业务自定义 SVG，并复用统一的尺寸、颜色和动画容器 |
