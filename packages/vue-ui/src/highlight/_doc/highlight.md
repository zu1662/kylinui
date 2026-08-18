# Highlight 关键词高亮

从一段文本中定位并强调一个或多个关键词，适用于搜索结果、筛选反馈和内容摘要。

## 基础用法

```vue
<KyHighlight text="组件规范让设计与开发保持一致。" keywords="规范" />
```

## 多个关键词

```vue
<KyHighlight
  :keywords="['语义化 Token', '公共组件']"
  text="优先使用语义化 Token 和公共组件，减少重复实现。"
/>
```

重叠的匹配区间会自动合并，避免生成嵌套或重复标记。

## 正则匹配

关闭 `literal` 后，关键词会按正则表达式解析。无效表达式不会中断页面渲染，而是按无匹配处理。

```vue
<KyHighlight :literal="false" keywords="KY-\\d+" text="需求编号 KY-2048 已进入验证阶段。" />
```

## API

### Props

| 属性          | 类型               | 默认值 | 说明                                   |
| ------------- | ------------------ | ------ | -------------------------------------- |
| text          | string             | `''`   | 待处理的完整文本                       |
| keywords      | string \| string[] | `''`   | 需要强调的关键词                       |
| caseSensitive | boolean            | false  | 是否区分英文字母大小写                 |
| literal       | boolean            | true   | 是否按普通文本匹配；关闭后使用正则匹配 |
| tag           | string             | `span` | 根节点标签名                           |

## 样式变量

| 变量名                         | 说明         |
| ------------------------------ | ------------ |
| --ky-highlight-color           | 普通文本颜色 |
| --ky-highlight-mark-color      | 高亮文本颜色 |
| --ky-highlight-mark-background | 高亮背景色   |
| --ky-highlight-mark-radius     | 高亮圆角     |
| --ky-highlight-mark-padding    | 高亮内边距   |

## 类型与工具导出

```ts
import type { HighlightChunk, HighlightKeywords, HighlightProps } from '@kylinui/vue';
import { createHighlightChunks } from '@kylinui/vue';
```
