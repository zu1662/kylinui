# Button 按钮

按钮用于触发即时操作，并通过层级、状态和尺寸表达操作优先级。

## 使用建议

- 一个页面区域只保留一个主要按钮。
- 危险操作必须搭配明确文案，不能只依赖红色。
- 加载状态会禁用重复点击并设置 aria-busy。

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| variant | primary / secondary / text / danger / gradient | primary | 按钮视觉类型 |
| size | large / medium / small / mini | medium | 按钮尺寸 |
| block | boolean | false | 是否占满容器宽度 |
| loading | boolean | false | 是否显示加载状态 |
| disabled | boolean | false | 是否禁用 |
| subtitle | string | - | 按钮副标题 |
| nativeType | button / submit / reset | button | 原生按钮类型 |
