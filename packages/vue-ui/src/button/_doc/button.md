# Button 按钮

Button 用于触发即时操作，并通过层级、状态和尺寸表达操作优先级。

## 使用建议

- 一个页面区域只保留一个主要按钮。
- 危险操作必须搭配明确文案，不能只依赖红色。
- 加载状态会禁用重复点击并设置 `aria-busy`。

## API

| 属性             | 类型                                                           | 默认值      | 说明                 |
| ---------------- | -------------------------------------------------------------- | ----------- | -------------------- |
| variant          | `'primary' \| 'secondary' \| 'text' \| 'danger' \| 'gradient'` | `'primary'` | 按钮视觉类型         |
| size             | `'large' \| 'medium' \| 'small' \| 'mini'`                     | `'medium'`  | 按钮尺寸             |
| block            | `boolean`                                                      | `false`     | 是否占满容器宽度     |
| list             | `boolean`                                                      | `false`     | 是否使用列表按钮模式 |
| plain            | `boolean`                                                      | `false`     | 是否使用朴素样式     |
| shadow           | `boolean`                                                      | `false`     | 是否显示阴影         |
| loading          | `boolean`                                                      | `false`     | 是否显示加载状态     |
| disabled         | `boolean`                                                      | `false`     | 是否禁用             |
| subtitle         | `string`                                                       | -           | 按钮副标题           |
| subtitlePosition | `'bottom' \| 'left'`                                           | `'bottom'`  | 副标题位置           |
| icon             | `string`                                                       | -           | KyIcon 字体图标名称  |
| nativeType       | `'button' \| 'submit' \| 'reset'`                              | `'button'`  | 原生按钮类型         |

`icon` 字符串会交给 `KyIcon` 的 Iconfont 模式渲染；如需自定义 SVG 或组件，使用 `icon` 插槽。

## 事件

| 事件名 | 说明                               | 回调参数            |
| ------ | ---------------------------------- | ------------------- |
| click  | 点击未禁用且非加载状态的按钮时触发 | `event: MouseEvent` |

## 插槽

| 名称    | 说明           |
| ------- | -------------- |
| icon    | 自定义按钮图标 |
| default | 按钮主要内容   |
