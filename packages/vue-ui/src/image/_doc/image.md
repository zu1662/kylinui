# Image 图片

用于展示具备固定尺寸或比例的图片，支持响应式图片、可配置懒加载观察根节点和有限失败重试。Image 只负责图片加载与展示，不内置图片预览能力。

## 基础用法

```vue
<KyImage src="/cover.jpg" alt="内容封面" width="160" height="112" fit="cover" />
```

## 响应式图片

```vue
<KyImage
  src="/cover-640.jpg"
  srcset="/cover-320.jpg 320w, /cover-640.jpg 640w, /cover-960.jpg 960w"
  sizes="(max-width: 480px) 100vw, 480px"
  alt="响应式内容封面"
  width="100%"
  height="240"
  fit="cover"
/>
```

`srcset` 与 `sizes` 会直接传递给内部原生图片元素，由浏览器按视口和设备像素比选择资源。

## 自定义懒加载与失败重试

```vue
<KyImage
  src="/remote-cover.jpg"
  lazy
  lazy-root="#scroll-container"
  lazy-root-margin="120px"
  :retry="2"
  :retry-delay="600"
  @retry="handleRetry"
/>
```

`lazyRoot` 可以传入选择器、`Element` 或 `null`。选择器无效、SSR 环境没有 `document`，或浏览器不支持 `IntersectionObserver` 时，组件会回退为直接加载。`retry` 会取非负整数并硬性限制为最多 10 次，避免持续请求。

每次图片源、响应式图片配置或懒加载配置变化都会使旧请求失效；组件卸载后，观察器、重试定时器和晚到的异步回调也不会再更新当前实例。

## 结合 ImagePreview 使用

需要预览图片时，由业务层显式组合 Image 与 ImagePreview。使用原生按钮承载点击和键盘语义，Image 本身不负责打开或管理预览状态。

```vue
<template>
  <button type="button" aria-label="打开图片预览" @click="previewVisible = true">
    <KyImage :src="images[0].src" alt="内容封面" width="160" height="112" fit="cover" />
  </button>

  <KyImagePreview v-model="previewVisible" :images="images" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const previewVisible = ref(false);
const images = [
  { src: '/gallery/cover.jpg', alt: '内容封面' },
  { src: '/gallery/detail.jpg', alt: '内容详情' },
];
</script>
```

## API

### Props

| 属性           | 类型                                                       | 默认值     | 说明                                 |
| -------------- | ---------------------------------------------------------- | ---------- | ------------------------------------ |
| src            | `string`                                                   | `''`       | 图片地址                             |
| srcset         | `string`                                                   | `''`       | 原生响应式图片候选资源               |
| sizes          | `string`                                                   | `''`       | 原生响应式图片尺寸提示               |
| alt            | `string`                                                   | `''`       | 图片替代文本                         |
| fit            | `'contain' \| 'cover' \| 'fill' \| 'none' \| 'scale-down'` | `'fill'`   | 图片填充方式                         |
| position       | `string`                                                   | `'center'` | 图片裁剪位置                         |
| width          | `number \| string`                                         | -          | 容器宽度，数字单位为 `px`            |
| height         | `number \| string`                                         | -          | 容器高度，数字单位为 `px`            |
| radius         | `number \| string`                                         | -          | 圆角，数字单位为 `px`                |
| round          | `boolean`                                                  | `false`    | 是否显示为圆形                       |
| block          | `boolean`                                                  | `false`    | 是否使用块级布局                     |
| lazy           | `boolean`                                                  | `false`    | 是否进入观察区域后再加载             |
| lazyRoot       | `string \| Element \| null`                                | `null`     | IntersectionObserver 根节点或选择器  |
| lazyRootMargin | `string`                                                   | `'0px'`    | IntersectionObserver 的 `rootMargin` |
| retry          | `number`                                                   | `0`        | 加载失败后的重试次数，最多 10 次     |
| retryDelay     | `number`                                                   | `0`        | 每次重试前的等待时间，单位为 `ms`    |
| showLoading    | `boolean`                                                  | `true`     | 是否展示加载状态                     |
| showError      | `boolean`                                                  | `true`     | 是否展示最终失败状态                 |
| crossorigin    | `ImgHTMLAttributes['crossorigin']`                         | -          | 原生图片跨域属性                     |
| referrerpolicy | `ImgHTMLAttributes['referrerpolicy']`                      | -          | 原生图片来源策略                     |
| decoding       | `ImgHTMLAttributes['decoding']`                            | `'async'`  | 原生图片解码策略                     |

### 事件

| 事件名 | 参数                               | 说明                                   |
| ------ | ---------------------------------- | -------------------------------------- |
| load   | `event: Event`                     | 当前请求加载成功                       |
| error  | `event: Event`                     | 每次加载失败时触发，包括仍会重试的失败 |
| retry  | `attempt: number, maximum: number` | 安排一次有限重试时触发                 |

### 插槽

| 名称    | 说明                   |
| ------- | ---------------------- |
| loading | 自定义加载状态内容     |
| error   | 自定义最终失败状态内容 |

内部比例样式只作用于组件直接渲染的 `.ky-image__img`，不会通过宽泛的 slot 后代选择器污染 `loading`、`error` 插槽中的图片。
