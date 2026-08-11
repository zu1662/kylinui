# NavBar 导航栏

NavBar 用于展示页面顶部标题、返回操作和右侧操作区域，并统一提供主题、吸顶、固定定位和顶部安全区能力。

## 使用建议

- 左、中、右三列网格会让标题保持视觉居中。
- `beforeBack` 可拦截返回操作；同步或异步返回 `false` 时不会触发 `click-left`。
- `showBack`、`safeTop` 是迁移别名，推荐分别使用 `leftArrow`、`safeAreaInsetTop`。

## API

| 属性             | 类型                                                | 默认值    | 说明                                            |
| ---------------- | --------------------------------------------------- | --------- | ----------------------------------------------- |
| title            | `string`                                            | `''`      | 标题                                            |
| leftText         | `string`                                            | `''`      | 左侧文字                                        |
| rightText        | `string`                                            | `''`      | 右侧文字                                        |
| leftArrow        | `boolean`                                           | `false`   | 是否显示返回箭头                                |
| showBack         | `boolean`                                           | `false`   | `leftArrow` 的迁移别名                          |
| safeAreaInsetTop | `boolean`                                           | `false`   | 是否适配顶部安全区                              |
| safeTop          | `boolean`                                           | `false`   | `safeAreaInsetTop` 的迁移别名                   |
| theme            | `'light' \| 'dark' \| 'gradient'`                   | `'light'` | 视觉主题                                        |
| sticky           | `boolean`                                           | `false`   | 是否吸顶                                        |
| fixed            | `boolean`                                           | `false`   | 是否固定在顶部                                  |
| placeholder      | `boolean`                                           | `false`   | 固定定位时是否生成等高占位元素                  |
| zIndex           | `number \| string`                                  | `1`       | 层级                                            |
| beforeBack       | `() => boolean \| void \| Promise<boolean \| void>` | -         | 返回前钩子，返回或兑现为 `false` 时阻止返回事件 |

## 事件

| 事件名      | 说明                                 | 回调参数 |
| ----------- | ------------------------------------ | -------- |
| click-left  | 点击左侧区域且未被 `beforeBack` 拦截 | -        |
| click-right | 点击右侧区域                         | -        |

## 插槽

| 名称  | 说明     |
| ----- | -------- |
| left  | 左侧内容 |
| title | 标题内容 |
| right | 右侧内容 |
