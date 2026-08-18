# NavBar 导航栏

用于移动页面顶部标题和左右操作区，支持标准链接、原生点击事件、异步返回拦截、顶部安全区、吸顶和固定布局。

## 基础用法

```vue
<KyNavBar
  title="订单详情"
  left-arrow
  left-text="返回"
  right-text="帮助"
  @click-left="goBack"
  @click-right="openHelp"
/>
```

## 异步返回拦截

```vue
<KyNavBar title="编辑资料" left-arrow left-href="/profile" :before-back="confirmDiscard" />
```

`beforeBack` 返回 `false` 时取消返回；返回 `true`、`void` 或对应 Promise 时继续触发 `click-left`。配置 `leftHref` 时，确认通过后继续导航。新窗口导航仍受浏览器弹窗策略约束，复杂路由场景建议在点击事件中由消费方处理。

## API

### Props

| 属性             | 类型           | 默认值  | 说明                              |
| ---------------- | -------------- | ------- | --------------------------------- |
| title            | `string`       | `''`    | 标题                              |
| leftText         | `string`       | `''`    | 左侧文案                          |
| rightText        | `string`       | `''`    | 右侧文案                          |
| leftArrow        | `boolean`      | `false` | 是否展示返回箭头                  |
| showBack         | `boolean`      | `false` | 已废弃，请使用 `leftArrow`        |
| safeAreaInsetTop | `boolean`      | `false` | 是否补充顶部安全区                |
| safeTop          | `boolean`      | `false` | 已废弃，请使用 `safeAreaInsetTop` |
| theme            | `'light'       | 'dark'  | 'gradient'`                       | `'light'` | 主题 |
| sticky           | `boolean`      | `false` | 是否吸顶；`fixed` 开启时不生效    |
| fixed            | `boolean`      | `false` | 是否固定在视口顶部                |
| placeholder      | `boolean`      | `false` | 固定时是否生成等高占位            |
| zIndex           | `number        | string` | `1`                               | 层级      |
| leftHref         | `string`       | `''`    | 左侧原生链接地址                  |
| leftTarget       | `string`       | -       | 左侧链接目标                      |
| leftRel          | `string`       | -       | 左侧链接关系                      |
| rightHref        | `string`       | `''`    | 右侧原生链接地址                  |
| rightTarget      | `string`       | -       | 右侧链接目标                      |
| rightRel         | `string`       | -       | 右侧链接关系                      |
| beforeBack       | `() => boolean | void    | Promise<boolean                   | void>`    | -    | 左侧操作前置确认 |

### 事件

| 事件名      | 参数                | 说明                   |
| ----------- | ------------------- | ---------------------- |
| click-left  | `event: MouseEvent` | 左侧操作通过拦截后触发 |
| click-right | `event: MouseEvent` | 点击右侧操作区         |

### 插槽

| 名称  | 说明           |
| ----- | -------------- |
| left  | 自定义左侧内容 |
| title | 自定义标题     |
| right | 自定义右侧内容 |
