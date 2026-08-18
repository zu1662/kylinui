# Popup 弹出层

Popup 用于在当前页面上方承载临时内容，是对话框、底部操作面板和业务浮层的基础容器。

## 设计说明

- 组件只负责通用弹层能力，复杂操作面板优先使用 Action Sheet。
- 默认面板动画随位置自动选择：`bottom → slide-up`、`top → slide-down`、`left → slide-right`、`right → slide-left`、`center → zoom`。
- 默认进入时长为 300ms、退出时长为 275ms；系统开启“减少动态效果”时会自动压缩动画时长。
- 所有 Popup 通过 Overlay Manager 统一进入浮层栈：后打开的浮层自动获得更高层级，只有顶层响应遮罩点击和浏览器或 WebView 返回。
- 多个浮层同时锁定页面时使用引用计数，关闭其中一层不会提前恢复背景滚动；退出动画结束或组件销毁后会自动注销。
- 未显式配置 `teleport` 时使用统一的 `[data-ky-overlay-container]` 容器；命令式 Dialog、Toast 和 ImagePreview 宿主会继承最近安装的 Vue 应用上下文。

## API

| 属性            | 类型                                                 | 默认值                       | 说明                             |
| --------------- | ---------------------------------------------------- | ---------------------------- | -------------------------------- |
| modelValue      | `boolean`                                            | `false`                      | 控制弹层显示状态                 |
| position        | `'top' \| 'right' \| 'bottom' \| 'left' \| 'center'` | `'center'`                   | 弹出方向                         |
| overlay         | `boolean`                                            | `true`                       | 是否显示遮罩                     |
| closeOnOverlay  | `boolean`                                            | `true`                       | 点击遮罩是否关闭                 |
| lockScroll      | `boolean`                                            | `true`                       | 显示时是否锁定背景滚动           |
| closeOnPopstate | `boolean`                                            | `true`                       | 系统返回时是否关闭当前顶层浮层   |
| round           | `boolean`                                            | `false`                      | 是否显示圆角面板                 |
| safeArea        | `boolean`                                            | `true`                       | 是否适配底部安全区               |
| destroyOnClose  | `boolean`                                            | `true`                       | 关闭后是否销毁面板内容           |
| teleport        | `string \| Element \| false`                         | 统一浮层容器                 | Teleport 目标；`false` 原地渲染  |
| zIndex          | `number \| string`                                   | `900`                        | 层级起点；实际值按浮层栈递增     |
| animation       | `PopupAnimation \| string`                           | 根据 `position` 自动选择     | 内置动画名或自定义 Transition 名 |
| duration        | `number \| { enter?: number; leave?: number }`       | `{ enter: 300, leave: 275 }` | 动画时长，单位毫秒               |
| panelClass      | `HTMLAttributes['class']`                            | -                            | 附加到面板容器的类名             |
| role            | `'dialog' \| 'alertdialog'`                          | `'dialog'`                   | 面板的 ARIA 角色                 |
| ariaLabel       | `string \| null`                                     | `'弹出层'`                   | 面板的可访问名称                 |
| ariaLabelledby  | `string`                                             | -                            | 标题元素 ID                      |
| ariaDescribedby | `string`                                             | -                            | 描述元素 ID                      |

`PopupAnimation` 内置值包括 `zoom`、`punch`、`slide-up`、`slide-down`、`slide-left`、`slide-right`、`fade`、`fade-up`、`fade-down`、`fade-left`、`fade-right`、`post-up` 和 `none`。

## 事件

| 事件名            | 说明                   | 回调参数         |
| ----------------- | ---------------------- | ---------------- |
| update:modelValue | 显示状态变化时触发     | `value: boolean` |
| open              | 弹层开始打开时触发     | -                |
| opened            | 打开动画完成时触发     | -                |
| close             | 弹层开始关闭时触发     | -                |
| closed            | 关闭动画完成时触发     | -                |
| clickOverlay      | 顶层浮层点击遮罩时触发 | -                |

## 插槽

| 名称    | 说明         |
| ------- | ------------ |
| default | 弹层主体内容 |
