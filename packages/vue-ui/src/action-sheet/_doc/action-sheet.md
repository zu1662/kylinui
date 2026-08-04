# Action Sheet 动作面板

Action Sheet 从页面底部弹出，用于展示一组操作、规则说明或需要确认的临时流程。组件基于 Popup 实现，并补充标题、选项卡、固定高度、操作项和下拉关闭能力。

## 兼容说明

结合 `polaris-flight-front` 的实际调用，组件同时支持 `v-model:visible`、`maskClosable`、`heightFixed`、`heightFixedValue`、`contentStyle`、`tabArea` 和 `zIndex` 等旧接口；新代码推荐使用标准 `v-model` 和语义更清晰的属性。

## API

| 属性                          | 类型                | 默认值 | 说明                         |
| ----------------------------- | ------------------- | ------ | ---------------------------- |
| modelValue / visible          | boolean             | false  | 显示状态                     |
| title                         | string / number     | -      | 标题                         |
| actions                       | ActionSheetAction[] | []     | 默认操作项                   |
| showClose / closeIcon         | boolean             | true   | 是否显示关闭按钮             |
| closeOnOverlay / maskClosable | boolean             | true   | 点击遮罩是否关闭             |
| closeOnSwipe                  | boolean             | true   | 是否支持从顶部拖拽区下拉关闭 |
| cancelText                    | string              | -      | 取消按钮文字                 |
| confirmText                   | string              | -      | 确认按钮文字                 |
| tabs / tabArea                | ActionSheetTab[]    | []     | 顶部选项卡                   |
| activeTab                     | number              | 0      | 当前选项卡                   |
| heightFixed                   | boolean             | false  | 是否使用固定视口高度         |
| heightFixedValue              | number              | 86     | 固定高度，单位 vh            |
| maxHeight                     | string              | 86vh   | 最大高度                     |
| contentStyle                  | CSSProperties       | {}     | 内容区域样式                 |
| zIndex                        | number / string     | 1000   | 层级                         |

## 事件

`select`、`tabChange`、`confirm`、`cancel`、`show`、`hide`、`update:modelValue`、`update:visible`、`update:activeTab`。
