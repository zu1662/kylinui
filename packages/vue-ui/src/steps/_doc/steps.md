# Steps 步骤器

步骤器展示流程进度以及完成、当前、等待、错误和禁用状态。

## 使用建议

- 完成与错误状态同时使用符号和颜色表达。
- 项目可以为单个步骤显式指定 status 覆盖自动计算。

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| items | StepItem[] | - | 步骤数据 |
| current | number | 0 | 当前步骤索引 |
| direction | horizontal / vertical | horizontal | 排列方向 |
