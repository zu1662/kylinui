# Button 按钮

按钮用于触发即时操作，并通过层级、状态和尺寸表达操作优先级。

## 使用建议

- 一个页面区域只保留一个主要按钮。
- 危险操作必须搭配明确文案，不能只依赖红色。
- 加载状态会禁用重复点击并设置 `aria-busy`。

## API

| 属性       | 类型                                           | 默认值  | 说明             |
| ---------- | ---------------------------------------------- | ------- | ---------------- |
| variant    | primary / secondary / text / danger / gradient | primary | 按钮视觉类型     |
| size       | large / medium / small / mini                  | medium  | 按钮尺寸         |
| block      | boolean                                        | false   | 是否占满容器宽度 |
| loading    | boolean                                        | false   | 是否显示加载状态 |
| disabled   | boolean                                        | false   | 是否禁用         |
| subtitle   | string                                         | -       | 按钮副标题       |
| nativeType | button / submit / reset                        | button  | 原生按钮类型     |

## 兼容能力

为降低 `polaris-flight-front` 的迁移成本，组件保留以下兼容属性：

- `type="primary | default | highlight"` 会映射到新的 `variant`。
- `size="big | default | tiny"` 会映射到 `large | medium | mini`。
- `subtext` / `subtextPosition` 对应新的副标题能力。
- `plain`、`list`、`shadow` 对应参考项目中的常用视觉形式。

新代码建议优先使用 `variant`、`size`、`subtitle` 和 `block`，兼容属性主要用于渐进迁移。
