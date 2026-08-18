# NumberKeyboard 数字键盘

用于输入数字、金额或验证码等内容的底部键盘，支持默认布局、侧栏完成按钮、额外按键与随机数字顺序。

## 基础用法

使用 `v-model` 绑定输入值，使用 `v-model:visible` 控制键盘显示状态。

```vue
<template>
  <KyButton @click="visible = true">输入金额</KyButton>
  <KyNumberKeyboard
    v-model="value"
    v-model:visible="visible"
    title="请输入支付金额"
    extra-key="."
    :maxlength="8"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { KyButton, KyNumberKeyboard } from '@kylinui/vue';

const value = ref('');
const visible = ref(false);
</script>
```

## 额外按键

使用 `extra-key` 配置默认布局左下角的按键内容，可用于身份证号等需要输入字母的场景。

```vue
<KyNumberKeyboard v-model="value" v-model:visible="visible" extra-key="X" close-text="完成" />
```

## 侧栏布局

`theme="custom"` 会把删除与完成操作放入右侧操作栏。该布局最多接受两个额外按键。

```vue
<KyNumberKeyboard
  v-model="value"
  v-model:visible="visible"
  theme="custom"
  :extra-key="['00', '.']"
  close-text="完成"
/>
```

## 配置多个按键

侧栏布局支持最多两个额外按键，按数组顺序排列在数字 `0` 两侧。

```vue
<KyNumberKeyboard
  v-model="value"
  v-model:visible="visible"
  theme="custom"
  :extra-key="['00', '.']"
  close-text="完成"
/>
```

## 随机数字

开启 `random-key-order` 后，每次打开键盘都会重新排列十个数字，适合对按键位置有随机化要求的场景。

```vue
<KyNumberKeyboard v-model="value" v-model:visible="visible" random-key-order :maxlength="6" />
```

## 双向绑定与最大长度

将 `v-model` 绑定到只读输入区域，并通过 `maxlength` 限制可输入字符数。

```vue
<KyCell title="输入值" :value="value || '点此输入'" is-link @click="visible = true" />
<KyNumberKeyboard v-model="value" v-model:visible="visible" :maxlength="6" />
```

## API

### Props

| 属性               | 说明                                         | 类型                           | 默认值       |
| ------------------ | -------------------------------------------- | ------------------------------ | ------------ |
| modelValue         | 当前输入值，支持 `v-model`                   | `string`                       | `''`         |
| visible            | 是否显示键盘，支持 `v-model:visible`         | `boolean`                      | `false`      |
| title              | 键盘顶部提示文字                             | `string`                       | `''`         |
| theme              | 键盘布局                                     | `'default' \| 'custom'`        | `'default'`  |
| extraKey           | 额外按键；默认布局取一个，侧栏布局最多取两个 | `string \| string[]`           | `''`         |
| closeText          | 侧栏布局的关闭按钮文字                       | `string`                       | `'完成'`     |
| deleteText         | 删除键的无障碍说明                           | `string`                       | `'删除'`     |
| maxlength          | 输入值最大长度                               | `number`                       | `Infinity`   |
| randomKeyOrder     | 每次打开时是否随机排列数字                   | `boolean`                      | `false`      |
| showDeleteKey      | 是否显示删除键                               | `boolean`                      | `true`       |
| hideOnClickOutside | 点击键盘外部是否关闭                         | `boolean`                      | `true`       |
| safeArea           | 是否适配底部安全区                           | `boolean`                      | `true`       |
| teleport           | 挂载目标；设为 `false` 时保留在当前位置      | `TeleportProps['to'] \| false` | `'body'`     |
| zIndex             | 弹出层层级                                   | `number \| string`             | `900`        |
| disabled           | 是否禁用全部按键                             | `boolean`                      | `false`      |
| ariaLabel          | 键盘无障碍名称                               | `string`                       | `'数字键盘'` |

### Events

| 事件名            | 说明                     | 参数               |
| ----------------- | ------------------------ | ------------------ |
| update:modelValue | 输入值变化时触发         | `value: string`    |
| update:visible    | 显示状态变化时触发       | `visible: boolean` |
| input             | 点击数字或额外按键时触发 | `key: string`      |
| delete            | 点击删除键时触发         | -                  |
| close             | 点击完成按钮时触发       | -                  |
| blur              | 点击键盘外部并关闭时触发 | -                  |
| show              | 进入动画完成时触发       | -                  |
| hide              | 开始退出动画时触发       | -                  |

### Slots

| 名称      | 说明               | 插槽参数           |
| --------- | ------------------ | ------------------ |
| title     | 自定义顶部提示区域 | -                  |
| extra-key | 自定义额外按键内容 | `keyValue: string` |
| delete    | 自定义删除键内容   | -                  |
