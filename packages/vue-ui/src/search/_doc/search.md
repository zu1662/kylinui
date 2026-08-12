# Search 搜索

用于输入关键词并提交搜索，支持清空、操作按钮、禁用和只读状态。

## 基础用法

```vue
<KySearch v-model="keyword" @search="handleSearch" />
```

## Props

| 属性        | 类型      | 默认值             | 说明             |
| ----------- | --------- | ------------------ | ---------------- |
| modelValue  | `string`  | `''`               | 输入值           |
| label       | `string`  | -                  | 输入框左侧标签   |
| placeholder | `string`  | `请输入搜索关键词` | 占位提示         |
| shape       | `'round'  | 'square'`          | `'round'`        | 轮廓形状 |
| name        | `string`  | -                  | 原生表单字段名称 |
| maxlength   | `number`  | -                  | 最大输入长度     |
| clearable   | `boolean` | `true`             | 是否可清空       |
| showAction  | `boolean` | `false`            | 是否显示右侧操作 |
| actionText  | `string`  | `取消`             | 操作文案         |
| disabled    | `boolean` | `false`            | 是否禁用         |
| readonly    | `boolean` | `false`            | 是否只读         |
| autofocus   | `boolean` | `false`            | 是否自动聚焦     |

## 事件

支持 `update:modelValue`、`search`、`clear`、`action`、`focus` 和 `blur`。

## 实例方法

提供 `focus` 与 `blur`。
