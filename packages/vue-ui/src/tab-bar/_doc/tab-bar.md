# Tab Bar 标签导航

Tab Bar 用于在同一页面内切换同级内容。项目数量较少时按固定数量等分，超过可见数量后自动切换为横向滚动，并让当前项保持在可视区域中。

## API

| 属性                 | 类型            | 默认值   | 说明                         |
| -------------------- | --------------- | -------- | ---------------------------- |
| modelValue / current | string / number | 0        | 当前项的值或索引             |
| data                 | TabBarItem[]    | 必填     | 标签数据                     |
| fixedCount           | number          | 4        | 非滚动状态下的等分数量       |
| scrollable           | boolean         | 自动判断 | 是否强制横向滚动             |
| animated             | boolean         | true     | 是否启用指示线位移和滚动动画 |

`TabBarItem` 支持 `label`、`title`、`value`、`badge`、`disabled` 和 `icon`。其中 `icon` 为 `KyIcon` 的字体图标名称；需要完全自定义时可使用 `icon` 插槽。

组件使用 WAI-ARIA tablist/tab 语义，并支持键盘左右方向键切换。
