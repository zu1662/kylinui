# Input 输入框

输入框提供标签、辅助信息、错误说明和清空能力。

## 使用建议

- 错误原因紧邻字段展示，并通过 aria-describedby 建立关联。
- 保留原生 input 的输入法、自动填充和键盘能力。

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | string / number | - | 输入值 |
| label | string | - | 字段标签 |
| placeholder | string | - | 占位文案 |
| helper | string | - | 辅助说明 |
| error | string | - | 错误说明 |
| type | text / tel / email / password / number | text | 原生输入类型 |
| clearable | boolean | false | 是否允许清空 |
| disabled | boolean | false | 是否禁用 |
| readonly | boolean | false | 是否只读 |
