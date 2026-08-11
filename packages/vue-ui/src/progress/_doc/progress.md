# Progress 进度条

Progress 用于展示任务或流程的完成比例，并将输入值限制在 0 到 100 之间。

## 使用建议

- 可确定进度时展示准确比例；无法确定进度时优先使用 Loading。
- 自定义颜色时仍需保证进度文字与背景之间有足够对比度。

## API

| 属性        | 类型               | 默认值  | 说明                        |
| ----------- | ------------------ | ------- | --------------------------- |
| percentage  | `number`           | `0`     | 当前进度百分比              |
| strokeWidth | `number \| string` | `8`     | 进度条高度，数字单位为 `px` |
| color       | `string`           | `''`    | 进度颜色                    |
| trackColor  | `string`           | `''`    | 轨道颜色                    |
| pivotText   | `string`           | `''`    | 进度文字，默认显示百分比    |
| pivotColor  | `string`           | `''`    | 进度文字背景色              |
| showPivot   | `boolean`          | `true`  | 是否显示进度文字            |
| inactive    | `boolean`          | `false` | 是否使用非激活状态          |
