# IconX 字体图标

IconX 基于[同程出行字体图标示例](https://file.40017.cn/flightnew/icons/demo_index.html)中的 Iconfont 资源（Project id 2722740），字体文件随组件库本地打包，不依赖运行时远程地址。

组件使用独立的 `KyIconX` 字体族和 `ky-iconx` 样式前缀，不会覆盖宿主项目的 `.iconfont` 或 `.icon-*` 规则。默认继承 `currentColor`，可通过属性或父级 CSS 控制视觉效果。

## 基础用法

```vue
<KyIconX name="arrow-right" />
<KyIconX name="icon-warning" color="#c73851" :size="24" />
<KyIconX name="loading" spin label="加载中" />
```

`name` 支持来源样式中的完整名称，例如 `icon-arrow-right`；也支持省略 `icon-` 前缀，直接写为 `arrow-right`。纯装饰图标默认对读屏隐藏，传入 `label` 后会以图片语义暴露可访问名称。

## API

| 属性   | 类型            | 默认值       | 说明                                 |
| ------ | --------------- | ------------ | ------------------------------------ |
| name   | string          | 必填         | 字体图标名称，可省略 `icon-` 前缀    |
| size   | number / string | 20           | 图标尺寸，数字自动转换为 `px`        |
| color  | string          | currentColor | 图标颜色                             |
| rotate | number          | 0            | 静态旋转角度                         |
| spin   | boolean         | false        | 是否持续旋转，适用于加载状态         |
| label  | string          | -            | 可访问名称；未提供时作为装饰图标隐藏 |
