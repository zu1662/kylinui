# Bottom Sheet 底部浮层

底部浮层适合移动端筛选、选择和补充操作，并处理底部安全区。

## 使用建议

- 打开时锁定页面背景滚动。
- 重要流程可关闭遮罩点击退出，避免误触。
- 页脚使用 safe-area-inset-bottom 保留系统手势空间。

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | boolean | false | 是否显示 |
| title | string | - | 浮层标题 |
| height | string | 80vh | 最大高度 |
| showClose | boolean | true | 是否显示关闭按钮 |
| closeOnOverlay | boolean | true | 点击遮罩是否关闭 |
