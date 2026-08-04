# Swiper 轮播

Swiper 用于在有限空间内循环展示图片或卡片内容，支持触摸拖动、鼠标拖动、自动播放和指示点切换。

## 手势说明

- 拖动达到阈值后切换到上一项或下一项。
- 组件会先判断横向或纵向手势；纵向滑动交还给页面滚动，避免阻断手机模拟器内的浏览操作。
- 可使用 `item` 插槽渲染业务卡片；`data` 中的 `image` 或 `url` 可直接用于图片轮播。

## API

| 属性       | 类型             | 默认值       | 说明                           |
| ---------- | ---------------- | ------------ | ------------------------------ |
| modelValue | number           | initialIndex | 当前索引                       |
| data       | array            | []           | 轮播数据                       |
| loop       | boolean          | true         | 是否循环                       |
| autoplay   | boolean / number | false        | 是否自动播放；数字表示播放间隔 |
| interval   | number           | 3000         | 自动播放间隔，单位毫秒         |
| duration   | number           | 300          | 切换动画时长，单位毫秒         |
| showDots   | boolean          | true         | 是否显示指示点                 |
| touchable  | boolean          | true         | 是否允许拖动                   |
| scale      | number           | 1            | 单个卡片占视口的比例           |
| gap        | number           | 0            | 卡片间距                       |

## 方法与事件

组件暴露 `next`、`prev`、`goTo` 方法，并触发 `change`、`dragStart`、`dragEnd` 与 `update:modelValue` 事件。
