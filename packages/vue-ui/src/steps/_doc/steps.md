# Steps 步骤器

Steps 用于展示流程进度，并通过完成、当前、等待、错误和禁用状态说明每个步骤的位置。

## 使用建议

- 水平方向适合步骤较少的流程，步骤较多或描述较长时使用垂直方向。
- 错误和完成状态同时使用图标与颜色表达，避免只依赖颜色。

## API

| 属性      | 类型                         | 默认值         | 说明         |
| --------- | ---------------------------- | -------------- | ------------ |
| items     | `StepItem[]`                 | 必填           | 步骤数据     |
| current   | `number`                     | `0`            | 当前步骤索引 |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | 排列方向     |

`StepItem` 包含 `title`、`description` 和 `status`；`status` 可选值为 `wait`、`process`、`finish`、`error`、`disabled`。未设置时根据 `current` 自动计算。
