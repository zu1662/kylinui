# Toast 轻提示

Toast 提供低打断的全局反馈，同一时间只显示一个实例。

## 基础用法

在应用根节点挂载一次 `<KyToast />`，业务代码通过 `showToast` 与 `hideToast` 控制全局单例，避免在多个子页面重复挂载。

## 使用建议

- 普通提示自动消失，失败提示保留更长阅读时间。
- loading 类型不会自动关闭，需要调用 hideToast 或使用新消息替换。
- 重要错误仍需在对应页面区域展示原因。

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| message | string | - | 提示内容 |
| type | text / success / error / loading | text | 反馈类型 |
| duration | number | 按类型决定 | 自动关闭时间，单位毫秒 |
