# Icon 图标

Icon 使用内置线性 SVG 路径渲染常用界面图标，不依赖图标字体，可稳定运行在 H5、App WebView 和文档站 iframe 中。

## API

| 属性        | 类型            | 默认值       | 说明                               |
| ----------- | --------------- | ------------ | ---------------------------------- |
| name        | string          | 必填         | 图标名称（参见下方内置集合）       |
| size        | number / string | 20           | 图标尺寸                           |
| color       | string          | currentColor | 图标颜色                           |
| strokeWidth | number          | 2            | 线条宽度                           |
| rotate      | number          | 0            | 旋转角度                           |
| spin        | boolean         | false        | 是否启用旋转动画                   |
| label       | string          | -            | 可访问名称；未传时作为装饰图标隐藏 |

内置图标集合：`chevron-right`、`chevron-left`、`chevron-down`、`chevron-up`、`close`、`check`、`check-circle`、`circle`、`info`、`help`、`plus`、`calendar`、`trash`、`edit`、`copy`、`bell`、`speaker`。新增图标时按相同结构在 `icon.ts` 中追加即可。

默认插槽可用于传入业务自定义 SVG，从而保留统一的尺寸、颜色和动画容器。
