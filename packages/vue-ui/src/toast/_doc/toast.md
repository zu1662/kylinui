# Toast 轻提示

Toast 提供低打断的全局反馈，同一时间只显示一个实例。

## 使用建议

- 普通提示自动消失，失败提示保留更长阅读时间。
- loading 类型默认不会自动关闭，需要调用返回控制器的 `close` 或 `hideToast`。
- 重要错误仍需在对应页面区域展示原因。

## API

| 属性              | 类型                             | 默认值     | 说明                                     |
| ----------------- | -------------------------------- | ---------- | ---------------------------------------- |
| message / content | string / number                  | -          | 提示内容                                 |
| type              | text / success / error / loading | text       | 反馈类型                                 |
| duration          | number                           | 按类型决定 | 自动关闭时间，单位毫秒；0 表示不自动关闭 |
| position          | top / center / bottom            | bottom     | 显示位置                                 |
| zIndex            | number / string                  | 1000       | 层级                                     |
| forbidClick       | boolean                          | false      | 显示时是否拦截页面点击                   |
| onClose           | function                         | -          | 关闭回调                                 |

## 命令式调用

- `showToast` 支持字符串，也支持 `message` 或兼容字段 `content`，并返回 `{ close }`。
- `showLoading` 创建需要主动关闭的加载提示。
- `useToast()` 为 Composition API 提供 `show`、`loading` 和 `hide`。
- 安装 `KyToast` 后会自动创建单例宿主，文档站 iframe 内无需重复渲染组件。
