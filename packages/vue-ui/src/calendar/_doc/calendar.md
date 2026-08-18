# Calendar 日历

Calendar 用于在移动端完成单个日期、多个日期或日期区间选择。组件既可以通过弹出层承载，也可以关闭弹出模式后直接平铺在页面中。

当可选范围跨越较多月份时，建议启用月份切换模式，减少一次渲染的月份数量；需要连续浏览少量月份时可使用默认平铺模式。

## 引入

```ts
import { KyCalendar } from '@kylinui/vue';
```

## 基础用法

`show` 使用 `v-model:show` 控制弹出状态，选择完成后通过 `confirm` 事件取得日期。

```vue
<template>
  <KyCell title="选择日期" :value="dateText" is-link @click="show = true" />
  <KyCalendar v-model:show="show" @confirm="handleConfirm" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { KyCalendar, KyCell } from '@kylinui/vue';

const show = ref(false);
const dateText = ref('请选择');

function handleConfirm(date: Date) {
  dateText.value = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}
</script>
```

## 月份浏览

`switchMode="none"` 时，组件会按月份纵向连续排列，可在日历主体中上下滚动查看相邻月份。月份网格默认显示当前月份对应的低对比度数字背景，可通过 `showMonthMark` 关闭。`month` 和 `year-month` 模式仅渲染当前月份，并通过头部按钮切换。

平铺模式按月分批渲染：首次仅创建少量月份，滚动接近底部时继续加载后续月份，避免可选范围较大时一次性创建全部日期 DOM 阻塞首次打开。

## API

### Calendar Props

| 属性                | 类型                                        | 默认值           | 说明                                               |
| ------------------- | ------------------------------------------- | ---------------- | -------------------------------------------------- |
| show                | `boolean`                                   | `false`          | 是否显示弹出日历，支持 `v-model:show`              |
| type                | `'single' \| 'range' \| 'multiple'`         | `'single'`       | 日期选择类型                                       |
| title               | `string`                                    | `'日期选择'`     | 日历标题                                           |
| subtitle            | `string`                                    | `''`             | 标题下方的辅助文案；切换模式下默认显示当前年月     |
| defaultDate         | `Date \| Date[] \| null`                    | `null`           | 初始选中日期                                       |
| minDate             | `Date`                                      | 当天             | 最小可选日期                                       |
| maxDate             | `Date`                                      | 当天起六个月     | 最大可选日期                                       |
| maxRange            | `number`                                    | -                | 范围选择允许的最大天数，超出时居中 Toast 提示      |
| allowSameDay        | `boolean`                                   | `false`          | 范围选择是否允许起止日期为同一天                   |
| showConfirm         | `boolean`                                   | `true`           | 是否显示底部确认按钮；关闭后将在选择完成时直接确认 |
| confirmText         | `string`                                    | `'确定'`         | 确认按钮文字                                       |
| confirmDisabledText | `string`                                    | `'请选择日期'`   | 尚未形成有效选择时的按钮文字                       |
| firstDayOfWeek      | `number`                                    | `0`              | 每周起始日，`0` 表示周日，`1` 表示周一             |
| formatter           | `(day: CalendarDayItem) => CalendarDayItem` | -                | 日期单元格格式化函数                               |
| switchMode          | `'none' \| 'month' \| 'year-month'`         | `'none'`         | `none` 时纵向连续展示月份，其他模式使用按钮切换    |
| showMonthMark       | `boolean`                                   | `true`           | 是否在月份网格中显示月份背景数字                   |
| poppable            | `boolean`                                   | `true`           | 是否使用 Popup 承载；关闭后直接渲染日历            |
| position            | `'top' \| 'right' \| 'bottom' \| 'left'`    | `'bottom'`       | 弹出位置                                           |
| round               | `boolean`                                   | `true`           | 弹出面板是否显示圆角                               |
| closeOnOverlay      | `boolean`                                   | `true`           | 点击遮罩是否关闭                                   |
| teleport            | `TeleportProps['to'] \| false`              | `'body'`         | Popup 挂载目标                                     |
| safeArea            | `boolean`                                   | `true`           | 是否适配安全区                                     |
| ariaLabel           | `string`                                    | `'日期选择日历'` | 日历区域的无障碍名称                               |

### CalendarDayItem

| 字段       | 类型              | 说明                                       |
| ---------- | ----------------- | ------------------------------------------ |
| date       | `Date`            | 当前日期                                   |
| type       | `CalendarDayType` | 日期状态，如普通、禁用、范围起止或多选选中 |
| text       | `string`          | 日期主文案                                 |
| topInfo    | `string`          | 顶部辅助文案                               |
| bottomInfo | `string`          | 底部辅助文案                               |
| className  | `string`          | 附加到日期按钮的类名                       |

## 事件

| 事件名            | 触发条件                                 | 载荷                                           |
| ----------------- | ---------------------------------------- | ---------------------------------------------- |
| update:show       | 弹出状态需要更新时                       | `boolean`                                      |
| confirm           | 点击确认按钮，或关闭确认按钮后完成选择时 | `Date \| Date[]`                               |
| select            | 每次选择状态变化时                       | `Date \| Date[]`                               |
| unselect          | 多选模式取消某个日期时                   | `Date`                                         |
| overRange         | 范围长度超过 `maxRange` 时并居中提示     | `{ start: Date; end: Date; maxRange: number }` |
| clickDisabledDate | 点击不可选日期时                         | `Date`                                         |
| monthChange       | 通过切换按钮改变月份时                   | 当前月份首日 `Date`                            |
| close             | 主动关闭或 Popup 开始关闭时              | -                                              |
| closed            | Popup 关闭动画完成时                     | -                                              |

## 日期格式化

`formatter` 会在日期渲染前接收一份日期项副本。可以修改 `text`、`topInfo`、`bottomInfo` 和 `className`，并返回最终日期项。

```ts
const formatter = (day: CalendarDayItem) => {
  if (day.date.getDate() === 1) day.topInfo = '月初';
  if (day.type === 'start') day.bottomInfo = '入住';
  if (day.type === 'end') day.bottomInfo = '离店';
  return day;
};
```

## 无障碍与行为说明

- 日期网格使用原生按钮，禁用日期不可聚焦或选择，并通过 `aria-selected` 暴露选中状态。
- 弹出模式复用 Popup 的遮罩、滚动锁定、安全区和关闭动画；右上角关闭按钮提供明确的无障碍名称。
- 平铺模式使用 `region` 语义，适合嵌入表单、筛选面板或桌面预览。
