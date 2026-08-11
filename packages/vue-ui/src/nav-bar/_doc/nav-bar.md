# NavBar 导航栏

页面顶部标题、返回操作和右侧操作区域。原 System Bar 的主题、吸顶和顶部安全区能力已统一整合到 NavBar。

## 能力

- 支持标题及左、中、右插槽，三列网格保证标题保持居中。
- 支持 `light`、`dark`、`gradient` 三种主题。
- 支持吸顶、固定定位、顶部安全区和固定定位占位元素。
- 支持 `beforeBack` 返回拦截；同步或异步返回 `false` 时不会触发 `click-left`。

## Props

| 属性             | 类型                                           | 默认值 | 说明                                                 |
| ---------------- | ---------------------------------------------- | ------ | ---------------------------------------------------- |
| title            | string                                         | -      | 标题                                                 |
| leftText         | string                                         | -      | 左侧文字                                             |
| rightText        | string                                         | -      | 右侧文字                                             |
| leftArrow        | boolean                                        | false  | 是否显示返回箭头                                     |
| theme            | light / dark / gradient                        | light  | 视觉主题                                             |
| safeAreaInsetTop | boolean                                        | false  | 是否适配顶部安全区                                   |
| sticky           | boolean                                        | false  | 是否吸顶                                             |
| fixed            | boolean                                        | false  | 是否固定在顶部                                       |
| placeholder      | boolean                                        | false  | 固定定位时是否生成等高占位元素                       |
| zIndex           | number / string                                | 1      | 层级                                                 |
| beforeBack       | () => boolean / void / Promise<boolean / void> | -      | 返回前钩子，返回或兑现为 `false` 时阻止 `click-left` |

`showBack`、`safeTop` 作为原 System Bar 的迁移别名保留，推荐分别使用 `leftArrow`、`safeAreaInsetTop`。

## Events

| 事件名      | 说明                                 |
| ----------- | ------------------------------------ |
| click-left  | 点击左侧区域且未被 `beforeBack` 拦截 |
| click-right | 点击右侧区域                         |

## Slots

| 名称  | 说明     |
| ----- | -------- |
| left  | 左侧内容 |
| title | 标题内容 |
| right | 右侧内容 |
