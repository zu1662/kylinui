# Picker 滚动选择器

Picker 用于从单列或多列候选数据中选择值，支持触摸拖动、鼠标拖动、滚轮和键盘方向键操作。

## 使用建议

- 组件提供通用独立列选择能力，不在核心层内置省市级联、日期计算或业务规则。
- 级联数据或业务联动应由上层组合，并在 `change` 事件中更新列数据。
- 存在空列时确认按钮处于禁用状态，组件不会发出包含空选项的载荷。
- 拖动超过起始阈值后只接管纵向手势；横向移动不改变选项，纵向位移结合末速度投影后吸附到最近项。
- 首尾越界时使用阻尼反馈并在结束后回弹，滑动后的合成点击会被抑制，避免再次触发选项按钮。
- 系统启用 `prefers-reduced-motion: reduce` 时，不再执行速度投影且吸附动画时长归零。

## API

| 属性              | 类型                             | 默认值         | 说明                                |
| ----------------- | -------------------------------- | -------------- | ----------------------------------- |
| modelValue        | `PickerOption[]`                 | `[]`           | 当前选中值                          |
| columns           | `PickerColumn \| PickerColumn[]` | 必填           | 单列或多列数据                      |
| title             | `string`                         | `''`           | 工具栏标题                          |
| defaultIndex      | `number \| number[]`             | `0`            | 默认索引                            |
| columnsFieldNames | `PickerFieldNames`               | `{}`           | 自定义 text、value、children 字段名 |
| itemHeight        | `number`                         | `44`           | 单项高度，单位为 `px`               |
| visibleItemCount  | `number`                         | `5`            | 视口内显示的选项数量                |
| swipeDuration     | `number`                         | `300`          | 吸附动画时长，单位毫秒              |
| confirmText       | `string`                         | `'确认'`       | 确认按钮文字                        |
| cancelText        | `string`                         | `'取消'`       | 取消按钮文字                        |
| showToolbar       | `boolean`                        | `true`         | 是否显示取消、标题和确认区域        |
| disabled          | `boolean`                        | `false`        | 是否禁用                            |
| ariaLabel         | `string`                         | `'滚动选择器'` | 选择器的可访问名称                  |

## 事件

| 事件名            | 说明                 | 回调参数                                        |
| ----------------- | -------------------- | ----------------------------------------------- |
| update:modelValue | 选中值变化时触发     | `values: PickerOption[]`                        |
| change            | 任意列选择变化时触发 | `payload: PickerChangePayload`                  |
| confirm           | 点击确认按钮时触发   | `{ values: PickerOption[], indexes: number[] }` |
| cancel            | 点击取消按钮时触发   | -                                               |

## 插槽

| 名称   | 说明               | 插槽参数                                     |
| ------ | ------------------ | -------------------------------------------- |
| option | 自定义单个选项内容 | `option, index: number, columnIndex: number` |

## 实例方法

| 方法           | 说明                 | 返回值或参数                               |
| -------------- | -------------------- | ------------------------------------------ |
| getIndexes     | 获取各列当前索引     | `number[]`                                 |
| getValues      | 获取各列当前选中值   | `PickerOption[]`                           |
| setColumnIndex | 设置指定列的选中索引 | `columnIndex: number, optionIndex: number` |
