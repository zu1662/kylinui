# Tag 标签

标签用于展示分类、属性或短状态，不承担主要操作。

## 使用建议

- 状态信息需要同时提供文字，不能只依赖色彩。
- 可关闭标签只抛出 close 事件，数据删除由使用方处理。

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| tone | brand / info / success / warning / danger / vip | brand | 语义色调 |
| variant | soft / outline / solid | soft | 视觉样式 |
| round | boolean | false | 是否使用胶囊圆角 |
| closable | boolean | false | 是否显示关闭按钮 |
