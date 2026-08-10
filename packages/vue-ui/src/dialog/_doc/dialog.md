# Dialog 对话框

对话框用于重要确认、风险告知和需要明确决策的场景。组件复用 Popup 的遮罩和动画能力，默认使用 `zoom` 动画。

## 使用建议

- 默认不允许点击遮罩关闭。
- 打开后焦点进入对话框，背景滚动会被锁定，关闭后焦点返回触发元素。
- 确认事件不强制关闭，便于接入异步提交。
- `animation` 支持 Popup 内置动画和自定义 Vue Transition 名称。

## API

| 属性            | 类型                                        | 默认值                     | 说明                 |
| --------------- | ------------------------------------------- | -------------------------- | -------------------- |
| modelValue      | boolean                                     | false                      | 是否显示             |
| title           | string                                      | -                          | 标题                 |
| description     | string                                      | -                          | 说明文案             |
| confirmText     | string                                      | 确认                       | 确认按钮文案         |
| cancelText      | string                                      | 取消                       | 取消按钮文案         |
| showCancel      | boolean                                     | true                       | 是否显示取消按钮     |
| enableFooter    | boolean                                     | true                       | 是否显示底部按钮区   |
| danger          | boolean                                     | false                      | 是否为危险确认       |
| loading         | boolean                                     | false                      | 确认按钮是否加载中   |
| closeOnOverlay  | boolean                                     | false                      | 点击遮罩是否关闭     |
| closeOnEsc      | boolean                                     | true                       | 是否允许 Escape 关闭 |
| zIndex          | number / string                             | 900                        | 层级                 |
| animation       | PopupAnimation / string                     | zoom                       | 面板动画             |
| duration        | number / { enter?: number; leave?: number } | { enter: 300, leave: 275 } | 动画时长，单位毫秒   |
| boxStyle        | CSSProperties                               | {}                         | 对话框容器样式       |

## 命令式调用

- `showAlert`、`showConfirm`、`showDialog` 会按需创建单例宿主，并返回 `{ close }`。
- `useDialog()` 为 Composition API 提供 `alert`、`confirm`、`open` 和 `close`。
- 命令式确认回调返回 Promise 时，宿主自动进入 loading 状态并等待完成。
