# Popover 气泡

气泡在触发元素附近展示简短补充信息。

## 使用建议

- 仅适合简短文案，复杂交互应使用底部浮层。
- 默认点击外部关闭，并通过受控 v-model 管理显隐。

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | boolean | false | 是否显示 |
| placement | top / bottom / left / right | top | 展示方位 |
| trigger | click / manual | click | 触发方式 |
| closeOnOutside | boolean | true | 点击外部是否关闭 |
