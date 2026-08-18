# CountDown 倒计时

CountDown 用于实时展示倒计时数值，支持秒级或毫秒级更新、自定义格式、自定义内容和手动控制。

## 基础用法

`time` 表示倒计时总时长，单位为毫秒，可以传入数字或数字字符串。组件默认自动开始倒计时。

```vue
<KyCountDown :time="30 * 60 * 60 * 1000" />
```

## 自定义格式

通过 `format` 设置展示内容。未出现在格式中的较大时间单位会合并到下一级，例如不使用 `DD` 时，天数会合并到小时。

```vue
<KyCountDown :time="30 * 60 * 60 * 1000" format="DD 天 HH 时 mm 分 ss 秒" />
```

## 毫秒级渲染

默认只在秒数变化时更新。设置 `millisecond` 后，组件会按动画帧更新。`millisecond` 只控制刷新精度，要展示毫秒，`format` 必须包含 `S`、`SS` 或 `SSS`。

```vue
<KyCountDown millisecond :time="3000" format="ss:SSS" />
```

## 自定义内容

默认插槽直接提供当前时间的各个字段。

```vue
<KyCountDown :time="time">
  <template #default="{ hours, minutes, seconds }">
    {{ hours }}:{{ minutes }}:{{ seconds }}
  </template>
</KyCountDown>
```

## 手动控制

通过组件实例调用 `start`、`pause` 和 `reset`。当 `auto-start` 为 `false` 时，初始化和重置后不会自动开始。

```vue
<template>
  <KyCountDown
    ref="countDown"
    :time="3000"
    :auto-start="false"
    millisecond
    format="ss:SSS"
    @finish="onFinish"
  />
  <button @click="countDown?.start()">开始</button>
  <button @click="countDown?.pause()">暂停</button>
  <button @click="countDown?.reset()">重置</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { CountDownInstance } from '@kylinui/vue';

const countDown = ref<CountDownInstance | null>(null);
const onFinish = () => console.log('倒计时结束');
</script>
```

## API

### Props

| 属性        | 类型             | 默认值   | 说明                         |
| ----------- | ---------------- | -------- | ---------------------------- |
| time        | number \| string | 0        | 倒计时时长，单位毫秒         |
| format      | string           | HH:mm:ss | 时间格式                     |
| autoStart   | boolean          | true     | 是否在初始化和重置后自动开始 |
| millisecond | boolean          | false    | 是否开启毫秒级渲染           |

### format 格式

| 格式 | 说明         |
| ---- | ------------ |
| DD   | 天数         |
| HH   | 小时         |
| mm   | 分钟         |
| ss   | 秒数         |
| S    | 毫秒（1 位） |
| SS   | 毫秒（2 位） |
| SSS  | 毫秒（3 位） |

## 事件

| 事件名 | 回调参数                          | 说明             |
| ------ | --------------------------------- | ---------------- |
| change | currentTime: CountDownCurrentTime | 倒计时变化时触发 |
| finish | -                                 | 倒计时结束时触发 |

## 插槽

| 名称    | 参数                        | 说明       |
| ------- | --------------------------- | ---------- |
| default | CountDownCurrentTime 各字段 | 自定义内容 |

为兼容已有用法，默认插槽还提供 `current`，其值为完整的 `CountDownCurrentTime` 对象。

## CurrentTime

| 字段         | 类型   | 说明                 |
| ------------ | ------ | -------------------- |
| total        | number | 剩余总时间，单位毫秒 |
| days         | number | 剩余天数             |
| hours        | number | 剩余小时             |
| minutes      | number | 剩余分钟             |
| seconds      | number | 剩余秒数             |
| milliseconds | number | 剩余毫秒             |

## 实例方法

| 方法  | 参数 | 返回值 | 说明                                                 |
| ----- | ---- | ------ | ---------------------------------------------------- |
| start | -    | void   | 开始或继续倒计时                                     |
| pause | -    | void   | 暂停倒计时                                           |
| reset | -    | void   | 重置为 `time`；`auto-start` 为 true 时重置后自动开始 |

## 类型导出

```ts
import type { CountDownProps, CountDownInstance, CountDownCurrentTime } from '@kylinui/vue';
```
