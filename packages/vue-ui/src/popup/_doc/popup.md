# Popup 弹出层

Popup 用于在当前页面上方承载临时内容，是对话框、底部操作面板和业务浮层的基础容器。

## 设计说明

- 组件只负责通用弹层能力，复杂操作面板请优先使用 Action Sheet。
- 推荐使用 `modelValue`，同时保留 `visible` 以兼容参考项目现有调用。
- 点击遮罩是否关闭由 `closeOnOverlay` 控制，并支持锁定背景滚动。
- 遮罩和面板使用独立 Transition。默认面板动画随位置自动选择：`bottom → slide-up`、`top → slide-down`、`left → slide-right`、`right → slide-left`、`center → zoom`。
- 默认进入时长为 300ms，退出时长为 275ms；也可以传入单个数字覆盖为统一时长。

## API

| 属性                 | 类型                                        | 默认值                     | 说明                              |
| -------------------- | ------------------------------------------- | -------------------------- | --------------------------------- |
| modelValue / visible | boolean                                     | false                      | 控制弹层显示状态                  |
| position             | top / right / bottom / left / center        | center                     | 弹出方向                          |
| overlay              | boolean                                     | true                       | 是否显示遮罩                      |
| closeOnOverlay       | boolean                                     | true                       | 点击遮罩是否关闭                  |
| lockScroll           | boolean                                     | true                       | 显示时是否锁定背景滚动            |
| round                | boolean                                     | false                      | 是否显示圆角面板                  |
| safeArea             | boolean                                     | true                       | 是否适配底部安全区                |
| teleport             | string / Element / false                    | body                       | Teleport 目标；false 表示原地渲染 |
| zIndex               | number / string                             | 900                        | 层级                              |
| animation            | PopupAnimation / string                     | 根据 position 自动选择     | 内置动画名或自定义 Transition 名  |
| duration             | number / { enter?: number; leave?: number } | { enter: 300, leave: 275 } | 动画时长，单位毫秒                |
| panelClass           | HTMLAttributes['class']                     | -                          | 附加到面板容器的类名              |

`PopupAnimation` 内置值包括 `zoom`、`punch`、`slide-up`、`slide-down`、`slide-left`、`slide-right`、`fade`、`fade-up`、`fade-down`、`fade-left`、`fade-right`、`post-up` 和 `none`。

## 事件

`open`、`opened`、`close`、`closed`、`clickOverlay`、`update:modelValue`、`update:visible`。
