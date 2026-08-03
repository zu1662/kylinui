# System Bar 系统栏

系统栏提供返回、居中标题、右侧操作和顶部安全区适配。

## 使用建议

- 返回行为通过 back 事件交给路由层处理。
- 三列网格保持标题居中，不受左右内容宽度影响。
- safeTop 使用 env(safe-area-inset-top)。

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| title | string | - | 标题 |
| theme | light / dark / gradient | light | 视觉主题 |
| showBack | boolean | true | 是否显示返回按钮 |
| safeTop | boolean | true | 是否适配顶部安全区 |
| sticky | boolean | false | 是否吸顶 |
