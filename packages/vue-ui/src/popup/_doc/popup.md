# Popup 弹出层

Popup 用于在当前页面上方承载临时内容，是对话框、底部操作面板和业务浮层的基础容器。

## 设计说明

- 组件只负责通用弹层能力，复杂操作面板请优先使用 Action Sheet。
- 推荐使用 `modelValue`，同时保留 `visible` 以兼容参考项目现有调用。
- 点击遮罩是否关闭由 `closeOnOverlay` 控制，并支持锁定背景滚动。

## API

| 属性                 | 类型                                 | 默认值 | 说明                              |
| -------------------- | ------------------------------------ | ------ | --------------------------------- |
| modelValue / visible | boolean                              | false  | 控制弹层显示状态                  |
| position             | top / right / bottom / left / center | center | 弹出方向                          |
| overlay              | boolean                              | true   | 是否显示遮罩                      |
| closeOnOverlay       | boolean                              | true   | 点击遮罩是否关闭                  |
| lockScroll           | boolean                              | true   | 显示时是否锁定背景滚动            |
| round                | boolean                              | false  | 是否显示圆角面板                  |
| safeArea             | boolean                              | true   | 是否适配底部安全区                |
| teleport             | string / Element / false             | body   | Teleport 目标；false 表示原地渲染 |
| zIndex               | number / string                      | 900    | 层级                              |
| duration             | number                               | 220    | 动画时长，单位毫秒                |

## 事件

`open`、`opened`、`close`、`closed`、`clickOverlay`、`update:modelValue`、`update:visible`。
