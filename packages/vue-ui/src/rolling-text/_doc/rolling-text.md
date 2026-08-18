# RollingText 数字翻牌

将数值拆分为独立数字位并播放滚动动画，适用于统计数字、里程、金额和活动数据展示。

## 基础用法

```vue
<KyRollingText :value="2486" :min-integer-digits="4" />
```

## 数值格式

```vue
<KyRollingText :value="12864.5" :start-value="9800" :decimal-places="2" thousands />
```

## 手动控制

```vue
<template>
  <KyRollingText ref="rollingText" :auto-start="false" :value="2026" @finish="onFinish" />
  <button type="button" @click="rollingText?.start()">播放</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { RollingTextInstance } from '@kylinui/vue';

const rollingText = ref<RollingTextInstance | null>(null);
const onFinish = () => console.log('播放完成');
</script>
```

系统开启减少动态效果后，组件会缩短过渡时长、取消数字位错峰，并继续触发 `finish` 事件。

## API

### Props

| 属性             | 类型             | 默认值 | 说明                          |
| ---------------- | ---------------- | ------ | ----------------------------- |
| value            | number \| string | 0      | 结束数值                      |
| startValue       | number \| string | 0      | 起始数值                      |
| duration         | number           | 1000   | 动画时长，单位毫秒            |
| autoStart        | boolean          | true   | 是否自动播放                  |
| direction        | `up` \| `down`   | `up`   | 数字滚动方向                  |
| minIntegerDigits | number           | 1      | 至少展示的整数位数            |
| decimalPlaces    | number           | 0      | 固定展示的小数位数，最大为 12 |
| thousands        | boolean          | false  | 是否显示千位分隔符            |
| stagger          | boolean          | true   | 各数字位是否错峰开始滚动      |

### Events

| 事件名 | 回调参数 | 说明                     |
| ------ | -------- | ------------------------ |
| finish | -        | 动画完成或跳过动画后触发 |

### 实例方法

| 方法  | 参数 | 返回值 | 说明                   |
| ----- | ---- | ------ | ---------------------- |
| start | -    | void   | 从起始数值重新播放动画 |
| reset | -    | void   | 停止动画并展示结束数值 |

## 样式变量

| 变量名                        | 说明       |
| ----------------------------- | ---------- |
| --ky-rolling-text-color       | 文本颜色   |
| --ky-rolling-text-font-size   | 字号       |
| --ky-rolling-text-font-weight | 字重       |
| --ky-rolling-text-gap         | 字符间距   |
| --ky-rolling-text-digit-width | 数字位宽度 |

## 类型与工具导出

```ts
import type {
  RollingTextDirection,
  RollingTextExpose,
  RollingTextInstance,
  RollingTextProps,
  RollingTextValue,
} from '@kylinui/vue';
import { createRollingCharacters, formatRollingNumber } from '@kylinui/vue';
```
