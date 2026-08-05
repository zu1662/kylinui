# Action Sheet 动作面板

Action Sheet 从页面底部弹出，统一承载底部操作、筛选选择、规则说明和需要确认的临时流程。组件基于 Popup 实现，并提供标题、选项卡、固定高度、任意内容插槽、底栏操作区和下拉关闭能力，不再额外拆分 Bottom Sheet 组件。

默认动画与 siskin-next 的 Popup 行为一致：面板使用 `slide-up`，进入 300ms、退出 275ms；滑动动画只改变 `transform`，不会额外淡化面板。通过 `animation` 和 `duration` 可以复用 Popup 的其他动画或自定义 Transition。

## 兼容说明

结合 `polaris-flight-front` 的实际调用，组件同时支持 `v-model:visible`、`maskClosable`、`heightFixed`、`heightFixedValue`、`contentStyle`、`tabArea` 和 `zIndex` 等旧接口；新代码推荐使用标准 `v-model` 和语义更清晰的属性。

## API

| 属性                          | 类型                                        | 默认值                     | 说明                         |
| ----------------------------- | ------------------------------------------- | -------------------------- | ---------------------------- |
| modelValue / visible          | boolean                                     | false                      | 显示状态                     |
| title                         | string / number                             | -                          | 标题                         |
| actions                       | ActionSheetAction[]                         | []                         | 默认操作项                   |
| showClose / closeIcon         | boolean                                     | true                       | 是否显示关闭按钮             |
| closeOnOverlay / maskClosable | boolean                                     | true                       | 点击遮罩是否关闭             |
| closeOnSwipe                  | boolean                                     | true                       | 是否支持从顶部拖拽区下拉关闭 |
| cancelText                    | string                                      | -                          | 取消按钮文字                 |
| confirmText                   | string                                      | -                          | 确认按钮文字                 |
| tabs / tabArea                | ActionSheetTab[]                            | []                         | 顶部选项卡                   |
| activeTab                     | number                                      | 0                          | 当前选项卡                   |
| height                        | string                                      | -                          | 面板固定高度                 |
| heightFixed                   | boolean                                     | false                      | 是否使用固定视口高度         |
| heightFixedValue              | number                                      | 86                         | 固定高度，单位 vh            |
| maxHeight                     | string                                      | 86vh                       | 最大高度                     |
| contentStyle                  | CSSProperties                               | {}                         | 内容区域样式                 |
| zIndex                        | number / string                             | 1000                       | 层级                         |
| animation                     | PopupAnimation / string                     | slide-up                   | 面板动画                     |
| duration                      | number / { enter?: number; leave?: number } | { enter: 300, leave: 275 } | 动画时长，单位毫秒           |
| safeArea                      | boolean                                     | true                       | 是否由 Popup 追加安全区间距  |

## 事件

`select`、`tabChange`、`confirm`、`cancel`、`show`、`hide`、`update:modelValue`、`update:visible`、`update:activeTab`。

## 插槽

| 名称    | 说明                                           |
| ------- | ---------------------------------------------- |
| default | 自定义面板内容，可用于筛选、选择、说明或表单   |
| header  | 自定义顶栏；提供后替代默认标题区域             |
| footer  | 自定义底栏操作区；提供后替代确认与取消按钮组合 |
