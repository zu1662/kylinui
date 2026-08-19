# DatePicker 日期选择器

DatePicker 用于在移动端通过滚动列选择单个日期。年、月、日列会根据当前选择与可选边界联动，切换月份时会自动修正不存在的日期。

## 引入

```ts
import { KyDatePicker } from '@kylinui/vue';
```

## 基础用法

```vue
<template>
  <KyDatePicker
    v-model="date"
    :min-date="new Date(2024, 0, 1)"
    :max-date="new Date(2030, 11, 31)"
    @confirm="handleConfirm"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { KyDatePicker } from '@kylinui/vue';

const date = ref(new Date(2026, 7, 19));

function handleConfirm(payload: { value: Date }) {
  console.log(payload.value);
}
</script>
```

## 选择年月

通过 `columnsType` 控制展示列。未展示的日期部分会沿用当前值，并继续参与范围约束。

```vue
<KyDatePicker v-model="month" :columns-type="['year', 'month']" />
```

## API

### DatePicker Props

| 属性             | 类型                      | 默认值                         | 说明                     |
| ---------------- | ------------------------- | ------------------------------ | ------------------------ |
| modelValue       | `Date \| null`            | `null`                         | 当前日期，支持 `v-model` |
| minDate          | `Date`                    | 当前年份前 10 年的 1 月 1 日   | 最小可选日期             |
| maxDate          | `Date`                    | 当前年份后 10 年的 12 月 31 日 | 最大可选日期             |
| columnsType      | `DatePickerColumnType[]`  | `['year', 'month', 'day']`     | 展示的日期列             |
| formatter        | `(type, value) => string` | -                              | 自定义列选项文字         |
| title            | `string`                  | `'选择日期'`                   | 工具栏标题               |
| itemHeight       | `number`                  | `44`                           | 单个选项高度，单位像素   |
| visibleItemCount | `number`                  | `5`                            | 视口内显示的选项数量     |
| swipeDuration    | `number`                  | `300`                          | 吸附动画时长，单位毫秒   |
| confirmText      | `string`                  | `'确认'`                       | 确认按钮文字             |
| cancelText       | `string`                  | `'取消'`                       | 取消按钮文字             |
| showToolbar      | `boolean`                 | `true`                         | 是否显示工具栏           |
| disabled         | `boolean`                 | `false`                        | 是否禁用                 |
| ariaLabel        | `string`                  | `'日期选择器'`                 | 选择器的可访问名称       |

`DatePickerColumnType` 可选值为 `'year'`、`'month'`、`'day'`。

## 事件

| 事件名            | 说明                 | 回调参数                                                                          |
| ----------------- | -------------------- | --------------------------------------------------------------------------------- |
| update:modelValue | 选中日期变化时触发   | `Date`                                                                            |
| change            | 任意日期列变化时触发 | `{ value, selectedValues, selectedIndexes, columnType }: DatePickerChangePayload` |
| confirm           | 点击确认按钮时触发   | `{ value, selectedValues, selectedIndexes }: DatePickerConfirmPayload`            |
| cancel            | 点击取消按钮时触发   | -                                                                                 |

## 插槽

| 名称   | 说明               | 插槽参数                                 |
| ------ | ------------------ | ---------------------------------------- |
| option | 自定义单个选项内容 | `option, index, columnIndex, columnType` |

## 实例方法

| 方法            | 说明             | 返回值 |
| --------------- | ---------------- | ------ |
| getSelectedDate | 获取当前选中日期 | `Date` |
