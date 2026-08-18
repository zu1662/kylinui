# Action Sheet 动作面板

Action Sheet 从页面底部弹出，用于承载底部操作、筛选选择、规则说明和需要确认的临时流程。组件基于 Popup 实现，并提供标题、选项卡、固定高度、任意内容和底栏操作区。

默认使用 `slide-up` 动画，进入 300ms、退出 275ms；下拉关闭只改变面板位移，不额外淡化内容。拖拽区使用纵向方向锁，并结合位移或末速度判断关闭；系统启用 `prefers-reduced-motion: reduce` 时 Popup 动画时长归零。通过 `animation` 和 `duration` 可以复用 Popup 的其他动画或自定义 Transition。

## API

| 属性             | 类型                                           | 默认值                       | 说明                         |
| ---------------- | ---------------------------------------------- | ---------------------------- | ---------------------------- |
| modelValue       | `boolean`                                      | `false`                      | 显示状态                     |
| title            | `string \| number`                             | -                            | 标题                         |
| actions          | `ActionSheetAction[]`                          | `[]`                         | 默认操作项                   |
| showClose        | `boolean`                                      | `true`                       | 是否显示关闭按钮             |
| closeOnOverlay   | `boolean`                                      | `true`                       | 点击遮罩是否关闭             |
| closeOnSwipe     | `boolean`                                      | `true`                       | 是否支持从顶部拖拽区下拉关闭 |
| overlay          | `boolean`                                      | `true`                       | 是否显示遮罩                 |
| cancelText       | `string`                                       | -                            | 取消按钮文字                 |
| confirmText      | `string`                                       | -                            | 确认按钮文字                 |
| tabs             | `ActionSheetTab[] \| Array<string \| number>`  | `[]`                         | 顶部选项卡                   |
| activeTab        | `number`                                       | `0`                          | 当前选项卡索引               |
| height           | `string`                                       | -                            | 面板固定高度                 |
| heightFixed      | `boolean`                                      | `false`                      | 是否使用固定视口高度         |
| heightFixedValue | `number`                                       | `86`                         | 固定高度，单位为 `vh`        |
| maxHeight        | `string`                                       | `'86vh'`                     | 最大高度                     |
| contentStyle     | `CSSProperties`                                | `{}`                         | 内容区域样式                 |
| zIndex           | `number \| string`                             | `1000`                       | 层级                         |
| animation        | `PopupAnimation \| string`                     | `'slide-up'`                 | 面板动画                     |
| duration         | `number \| { enter?: number; leave?: number }` | `{ enter: 300, leave: 275 }` | 动画时长，单位毫秒           |
| safeArea         | `boolean`                                      | `true`                       | 是否追加底部安全区间距       |

## 事件

| 事件名            | 说明                     | 回调参数                                   |
| ----------------- | ------------------------ | ------------------------------------------ |
| update:modelValue | 显示状态变化时触发       | `value: boolean`                           |
| update:activeTab  | 当前选项卡变化时触发     | `value: number`                            |
| select            | 点击默认操作项时触发     | `action: ActionSheetAction, index: number` |
| tabChange         | 切换顶部选项卡时触发     | `index: number`                            |
| confirm           | 点击确认按钮时触发       | -                                          |
| cancel            | 点击取消或关闭按钮时触发 | -                                          |
| show              | 面板进入动画完成时触发   | -                                          |
| hide              | 面板开始关闭时触发       | -                                          |

## 插槽

| 名称    | 说明                                           | 插槽参数            |
| ------- | ---------------------------------------------- | ------------------- |
| default | 自定义面板内容，可用于筛选、选择、说明或表单   | `activeTab: number` |
| header  | 自定义顶栏；提供后替代默认标题区域             | -                   |
| footer  | 自定义底栏操作区；提供后替代确认与取消按钮组合 | -                   |
