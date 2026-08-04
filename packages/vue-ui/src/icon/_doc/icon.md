# Icon 图标

Icon 使用内置线性 SVG 路径渲染常用界面图标，不依赖图标字体，可稳定运行在 H5、App WebView 和文档站 iframe 中。

## 兼容名称

结合 `polaris-flight-front` 的真实用法，组件为 `arrow-right`、`information-line`、`explain-line`、`arrow-down`、`close`、`checked`、`uncheck`、`tick`、`clear` 和 `doubt-line` 等名称提供别名映射。后续可逐步扩充图标集合，无需变更业务调用。

## API

| 属性        | 类型            | 默认值       | 说明                               |
| ----------- | --------------- | ------------ | ---------------------------------- |
| name        | string          | 必填         | 图标名称或兼容别名                 |
| size        | number / string | 20           | 图标尺寸                           |
| color       | string          | currentColor | 图标颜色                           |
| strokeWidth | number          | 2            | 线条宽度                           |
| rotate      | number          | 0            | 旋转角度                           |
| spin        | boolean         | false        | 是否启用旋转动画                   |
| label       | string          | -            | 可访问名称；未传时作为装饰图标隐藏 |

默认插槽可用于传入业务自定义 SVG，从而保留统一的尺寸、颜色和动画容器。
