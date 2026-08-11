# Picker 滚动选择器

Picker 用于从单列或多列候选数据中选择值，支持触摸拖动、鼠标拖动、滚轮和键盘方向键操作。

## 能力边界

组件提供通用独立列选择能力，不在核心层内置省市级联、日期计算或特定业务规则。此类逻辑应由上层业务组合 Picker，保持基础组件轻量且可复用。

## API

| 属性              | 类型                          | 默认值 | 说明                                |
| ----------------- | ----------------------------- | ------ | ----------------------------------- |
| modelValue        | PickerOption[]                | []     | 当前选中值                          |
| columns           | PickerColumn / PickerColumn[] | 必填   | 单列或多列数据                      |
| title             | string                        | -      | 工具栏标题                          |
| defaultIndex      | number / number[]             | 0      | 默认索引                            |
| columnsFieldNames | object                        | {}     | 自定义 text、value、children 字段名 |
| itemHeight        | number                        | 44     | 单项高度                            |
| visibleItemCount  | number                        | 5      | 视口内显示的选项数量                |
| swipeDuration     | number                        | 300    | 吸附动画时长，单位毫秒              |
| showToolbar       | boolean                       | true   | 是否显示取消、标题和确认区域        |
| disabled          | boolean                       | false  | 是否禁用                            |

## 事件与方法

- `change` 返回 `{ values, indexes, columnIndex }`。
- `confirm` 返回 `{ values, indexes }`。
- `cancel` 在点击取消按钮时触发。
- 暴露 `getIndexes`、`getValues` 和 `setColumnIndex`。
