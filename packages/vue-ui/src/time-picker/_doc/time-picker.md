# TimePicker 时间选择器

TimePicker 用于在移动端通过滚动列选择一天内的时间。组件默认展示时、分列，可按需要增加秒列，并使用起止时间和步长限制可选项。

## 引入

```ts
import { KyTimePicker } from '@kylinui/vue';
```

## 基础用法

```vue
<template>
  <KyTimePicker
    v-model="time"
    min-time="08:30:00"
    max-time="22:00:00"
    :minute-step="5"
    @confirm="handleConfirm"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { KyTimePicker } from '@kylinui/vue';

const time = ref('14:30');

function handleConfirm(payload: { value: string }) {
  console.log(payload.value);
}
</script>
```

## 精确到秒

```vue
<KyTimePicker
  v-model="time"
  :columns-type="['hour', 'minute', 'second']"
  :minute-step="5"
  :second-step="10"
/>
```

时间值使用 24 小时制。默认时、分列输出 `HH:mm`；包含秒列时输出 `HH:mm:ss`。`minTime` 和 `maxTime` 约束同一天内的范围，不表示跨午夜区间。

## API

### TimePicker Props

| 属性             | 类型                      | 默认值               | 说明                     |
| ---------------- | ------------------------- | -------------------- | ------------------------ |
| modelValue       | `string`                  | `''`                 | 当前时间，支持 `v-model` |
| minTime          | `string`                  | `'00:00:00'`         | 最小可选时间             |
| maxTime          | `string`                  | `'23:59:59'`         | 最大可选时间             |
| columnsType      | `TimePickerColumnType[]`  | `['hour', 'minute']` | 展示的时间列             |
| hourStep         | `number`                  | `1`                  | 小时选项步长             |
| minuteStep       | `number`                  | `1`                  | 分钟选项步长             |
| secondStep       | `number`                  | `1`                  | 秒选项步长               |
| formatter        | `(type, value) => string` | -                    | 自定义列选项文字         |
| title            | `string`                  | `'选择时间'`         | 工具栏标题               |
| itemHeight       | `number`                  | `44`                 | 单个选项高度，单位像素   |
| visibleItemCount | `number`                  | `5`                  | 视口内显示的选项数量     |
| swipeDuration    | `number`                  | `300`                | 吸附动画时长，单位毫秒   |
| confirmText      | `string`                  | `'确认'`             | 确认按钮文字             |
| cancelText       | `string`                  | `'取消'`             | 取消按钮文字             |
| showToolbar      | `boolean`                 | `true`               | 是否显示工具栏           |
| disabled         | `boolean`                 | `false`              | 是否禁用                 |
| ariaLabel        | `string`                  | `'时间选择器'`       | 选择器的可访问名称       |

`TimePickerColumnType` 可选值为 `'hour'`、`'minute'`、`'second'`。

## 事件

| 事件名            | 说明                 | 回调参数                                                                          |
| ----------------- | -------------------- | --------------------------------------------------------------------------------- |
| update:modelValue | 选中时间变化时触发   | `string`                                                                          |
| change            | 任意时间列变化时触发 | `{ value, selectedValues, selectedIndexes, columnType }: TimePickerChangePayload` |
| confirm           | 点击确认按钮时触发   | `{ value, selectedValues, selectedIndexes }: TimePickerConfirmPayload`            |
| cancel            | 点击取消按钮时触发   | -                                                                                 |

## 插槽

| 名称   | 说明               | 插槽参数                                 |
| ------ | ------------------ | ---------------------------------------- |
| option | 自定义单个选项内容 | `option, index, columnIndex, columnType` |

## 实例方法

| 方法            | 说明             | 返回值   |
| --------------- | ---------------- | -------- |
| getSelectedTime | 获取当前选中时间 | `string` |
