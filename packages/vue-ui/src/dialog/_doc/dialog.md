# Dialog 对话框

对话框用于重要确认、风险告知和需要明确决策的场景。

## 使用建议

- 默认不允许点击遮罩关闭。
- 打开后焦点进入对话框，背景滚动会被锁定。
- 确认事件不强制关闭，便于接入异步提交。

## API

| 属性           | 类型    | 默认值 | 说明               |
| -------------- | ------- | ------ | ------------------ |
| modelValue     | boolean | false  | 是否显示           |
| title          | string  | -      | 标题               |
| description    | string  | -      | 说明文案           |
| confirmText    | string  | 确认   | 确认按钮文案       |
| cancelText     | string  | 取消   | 取消按钮文案       |
| showCancel     | boolean | true   | 是否显示取消按钮   |
| danger         | boolean | false  | 是否为危险确认     |
| loading        | boolean | false  | 确认按钮是否加载中 |
| closeOnOverlay | boolean | false  | 点击遮罩是否关闭   |
