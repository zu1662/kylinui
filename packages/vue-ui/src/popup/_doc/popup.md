# Popup 弹出层

Popup 用于在当前页面上方承载临时内容，是对话框、底部操作面板和业务浮层的基础容器。

## 设计说明

- 组件只负责通用弹层能力，复杂操作面板优先使用 Action Sheet。
- 默认面板动画随位置自动选择：`bottom → slide-up`、`top → slide-down`、`left → slide-right`、`right → slide-left`、`center → zoom`。
- 默认进入时长为 300ms、退出时长为 275ms；系统开启“减少动态效果”时会自动压缩动画时长。

## API

| 属性            | 类型                                                 | 默认值                       | 说明                             |
| --------------- | ---------------------------------------------------- | ---------------------------- | -------------------------------- |
| modelValue      | `boolean`                                            | `false`                      | 控制弹层显示状态                 |
| position        | `'top' \| 'right' \| 'bottom' \| 'left' \| 'center'` | `'center'`                   | 弹出方向                         |
| overlay         | `boolean`                                            | `true`                       | 是否显示遮罩                     |
| closeOnOverlay  | `boolean`                                            | `true`                       | 点击遮罩是否关闭                 |
| lockScroll      | `boolean`                                            | `true`                       | 显示时是否锁定背景滚动           |
| round           | `boolean`                                            | `false`                      | 是否显示圆角面板                 |
| safeArea        | `boolean`                                            | `true`                       | 是否适配底部安全区               |
| destroyOnClose  | `boolean`                                            | `true`                       | 关闭后是否销毁面板内容           |
| teleport        | `string \| Element \| false`                         | `'body'`                     | Teleport 目标；`false` 原地渲染  |
| zIndex          | `number \| string`                                   | `900`                        | 层级                             |
| animation       | `PopupAnimation \| string`                           | 根据 `position` 自动选择     | 内置动画名或自定义 Transition 名 |
| duration        | `number \| { enter?: number; leave?: number }`       | `{ enter: 300, leave: 275 }` | 动画时长，单位毫秒               |
| panelClass      | `HTMLAttributes['class']`                            | -                            | 附加到面板容器的类名             |
| role            | `'dialog' \| 'alertdialog'`                          | `'dialog'`                   | 面板的 ARIA 角色                 |
| ariaLabel       | `string \| null`                                     | `'弹出层'`                   | 面板的可访问名称                 |
| ariaLabelledby  | `string`                                             | -                            | 标题元素 ID                      |
| ariaDescribedby | `string`                                             | -                            | 描述元素 ID                      |

`PopupAnimation` 内置值包括 `zoom`、`punch`、`slide-up`、`slide-down`、`slide-left`、`slide-right`、`fade`、`fade-up`、`fade-down`、`fade-left`、`fade-right`、`post-up` 和 `none`。

## 事件

| 事件名            | 说明               | 回调参数         |
| ----------------- | ------------------ | ---------------- |
| update:modelValue | 显示状态变化时触发 | `value: boolean` |
| open              | 弹层开始打开时触发 | -                |
| opened            | 打开动画完成时触发 | -                |
| close             | 弹层开始关闭时触发 | -                |
| closed            | 关闭动画完成时触发 | -                |
| clickOverlay      | 点击遮罩时触发     | -                |

## 插槽

| 名称    | 说明         |
| ------- | ------------ |
| default | 弹层主体内容 |
