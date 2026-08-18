# Search 搜索

用于移动端关键词输入、提交、清除、取消和搜索建议展示。组件复用 Input 的输入控制能力，支持中文输入法 composition、formatter、焦点控制和软键盘提交语义。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue';

const keyword = ref('');
</script>

<template>
  <KySearch v-model="keyword" @search="handleSearch" />
</template>
```

## 搜索建议与加载

```vue
<KySearch
  v-model="keyword"
  show-action
  show-suggestions
  :suggestions="suggestions"
  :loading="loading"
  @cancel="cancelRequest"
  @suggestion="selectSuggestion"
/>
```

`suggestions` 插槽用于完全接管建议列表；组件只负责展示和选择通知，不内置请求、防抖、搜索历史或缓存。这些能力依赖具体接口和业务策略，应由数据层实现。

## API

### Props

| 属性            | 类型                          | 默认值                | 说明                                 |
| --------------- | ----------------------------- | --------------------- | ------------------------------------ |
| modelValue      | `string`                      | `''`                  | 输入值                               |
| label           | `string`                      | `''`                  | 输入框左侧标签                       |
| placeholder     | `string`                      | ConfigProvider locale | 占位提示                             |
| shape           | `'round'                      | 'square'`             | `'round'`                            | 输入区域轮廓   |
| name            | `string`                      | `''`                  | 原生表单字段名称                     |
| maxLength       | `number`                      | -                     | 最大输入长度                         |
| maxlength       | `number`                      | -                     | 已废弃，请使用 `maxLength`           |
| inputMode       | `InputMode`                   | `'search'`            | 原生 `inputmode`，用于提示软键盘布局 |
| autoComplete    | `string`                      | `'off'`               | 原生 `autocomplete`                  |
| enterKeyHint    | `InputEnterKeyHint`           | `'search'`            | 原生 `enterkeyhint`                  |
| formatter       | `(value: string) => string`   | -                     | 输入格式化函数                       |
| formatTrigger   | `'onChange'                   | 'onBlur'`             | `'onChange'`                         | 格式化触发时机 |
| clearable       | `boolean`                     | `true`                | 是否展示清除按钮                     |
| showAction      | `boolean`                     | `false`               | 是否展示右侧操作按钮                 |
| actionText      | `string`                      | ConfigProvider locale | 右侧操作文案                         |
| loading         | `boolean`                     | `false`               | 是否展示加载状态；加载时阻止搜索提交 |
| suggestions     | `readonly SearchSuggestion[]` | `[]`                  | 建议数据                             |
| showSuggestions | `boolean`                     | `false`               | 是否展开建议区域                     |
| disabled        | `boolean`                     | `false`               | 是否禁用                             |
| readonly        | `boolean`                     | `false`               | 是否只读                             |
| autofocus       | `boolean`                     | `false`               | 是否自动聚焦                         |

### SearchSuggestion

| 字段     | 类型      | 说明                       |
| -------- | --------- | -------------------------- |
| value    | `string`  | 选择后写入的值             |
| label    | `string`  | 展示文案，默认使用 `value` |
| disabled | `boolean` | 是否禁止选择               |

### 事件

| 事件名            | 参数                           | 说明                       |
| ----------------- | ------------------------------ | -------------------------- |
| update:modelValue | `value: string`                | 输入值变化                 |
| search            | `value: string`                | 表单提交或软键盘搜索键触发 |
| clear             | -                              | 点击清除按钮               |
| cancel            | `value: string`                | 点击右侧操作按钮           |
| action            | `value: string`                | 兼容原有右侧操作事件       |
| suggestion        | `suggestion: SearchSuggestion` | 选择可用建议               |
| focus             | `event: FocusEvent`            | 输入框获得焦点             |
| blur              | `event: FocusEvent`            | 输入框失去焦点             |

### 插槽

| 名称        | 参数                  | 说明                                    |
| ----------- | --------------------- | --------------------------------------- |
| label       | -                     | 左侧标签                                |
| action      | -                     | 右侧操作内容                            |
| loading     | -                     | 加载指示内容                            |
| suggestions | `{ keyword, select }` | 完全接管建议列表，`select` 用于选择建议 |

### 实例方法

| 方法   | 说明           |
| ------ | -------------- |
| focus  | 聚焦输入框     |
| blur   | 移除输入框焦点 |
| select | 选中输入框文本 |
