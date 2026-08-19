# PasswordInput 密码输入框

PasswordInput 用于支付密码、验证码等定长敏感信息录入，以等宽单元格明确展示输入进度，并支持原生软键盘或 Kylin 数字键盘。

## 使用建议

- 默认仅接收数字并隐藏内容；验证码场景可设置 `mask="false"` 与 `auto-complete="one-time-code"`。
- 使用原生软键盘时无需额外状态；配合 `KyNumberKeyboard` 时设置 `readonly`，并用 `focused` 同步视觉焦点。
- `variant="joined"` 适合连续密码格，`variant="separated"` 适合验证码等强调单字符的场景。
- 错误原因应通过 `error` 紧邻输入区展示，不要仅依赖颜色表达结果。

## 基础用法

```vue
<KyPasswordInput v-model="password" info="请输入 6 位支付密码" />
```

## 配合数字键盘

```vue
<template>
  <KyPasswordInput
    v-model="password"
    readonly
    :focused="keyboardVisible"
    @click="keyboardVisible = true"
  />
  <KyNumberKeyboard v-model="password" v-model:visible="keyboardVisible" :maxlength="6" />
</template>
```

## API

### Props

| 属性         | 说明                                       | 类型                      | 默认值         |
| ------------ | ------------------------------------------ | ------------------------- | -------------- |
| modelValue   | 当前输入值，支持 `v-model`                 | `string`                  | `''`           |
| length       | 输入单元格数量                             | `number`                  | `6`            |
| type         | 允许输入的字符类型                         | `'number' \| 'text'`      | `'number'`     |
| mask         | 是否隐藏已输入内容                         | `boolean`                 | `true`         |
| variant      | 单元格布局                                 | `'joined' \| 'separated'` | `'joined'`     |
| focused      | 外部控制视觉焦点；未传入时跟随原生输入焦点 | `boolean`                 | -              |
| showCursor   | 是否在当前空单元格中显示光标               | `boolean`                 | `true`         |
| info         | 辅助说明                                   | `string`                  | `''`           |
| error        | 错误说明，存在时覆盖普通辅助说明           | `string`                  | `''`           |
| disabled     | 是否禁用                                   | `boolean`                 | `false`        |
| readonly     | 是否只读；适合配合外部键盘                 | `boolean`                 | `false`        |
| name         | 原生字段名称                               | `string`                  | -              |
| id           | 原生控件 ID                                | `string`                  | -              |
| ariaLabel    | 无可见标签时的输入说明                     | `string`                  | `'密码输入框'` |
| autoComplete | 原生自动填充提示                           | `string`                  | `'off'`        |
| autofocus    | 是否自动聚焦                               | `boolean`                 | `false`        |

### Events

| 事件名            | 说明                         | 参数                |
| ----------------- | ---------------------------- | ------------------- |
| update:modelValue | 输入值变化时触发             | `value: string`     |
| focus             | 原生输入框获得焦点时触发     | `event: FocusEvent` |
| blur              | 原生输入框失去焦点时触发     | `event: FocusEvent` |
| click             | 点击输入区域时触发           | `event: MouseEvent` |
| complete          | 输入值首次达到指定长度时触发 | `value: string`     |

### Slots

| 名称 | 说明                     | 插槽参数                          |
| ---- | ------------------------ | --------------------------------- |
| info | 自定义辅助或错误说明区域 | `{ error: string, info: string }` |

### 方法

| 方法名 | 说明           |
| ------ | -------------- |
| focus  | 聚焦原生输入框 |
| blur   | 取消输入框焦点 |
