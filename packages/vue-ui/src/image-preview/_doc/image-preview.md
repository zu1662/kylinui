# ImagePreview 图片预览

用于全屏查看一组图片，支持拖动切换、页码提示、键盘操作、双击或滚轮缩放，以及组件式和服务式两种调用方式。

## 基础用法

```vue
<template>
  <button type="button" @click="visible = true">预览图片</button>
  <KyImagePreview v-model="visible" :images="images" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { KyImagePreview } from '@kylin-design/vue-ui';

const visible = ref(false);
const images = ['/images/one.jpg', '/images/two.jpg'];
</script>
```

## 指定起始位置

```vue
<KyImagePreview v-model="visible" :images="images" :start-position="1" />
```

## 服务式调用

```ts
import { showImagePreview } from '@kylin-design/vue-ui';

const controller = showImagePreview({
  images: [
    { src: '/images/one.jpg', alt: '图片一', caption: '第一张图片说明' },
    { src: '/images/two.jpg', alt: '图片二', caption: '第二张图片说明' },
  ],
  startPosition: 1,
  onChange: (index) => console.log('当前索引', index),
});

controller.close();
```

## 缩放与键盘操作

- 双击图片在默认比例和 `doubleTapZoom` 之间切换。
- 桌面端可使用滚轮缩放，放大后拖动图片查看细节。
- 移动端支持双指缩放；未放大时可横向滑动切换。缩放和平移保持为图片预览内部的有限多指手势，不与单轴拖动混为一个万能实现。
- 缩放或拖动后的合成点击会被统一守卫拦截，避免误触空白区域关闭。
- 系统启用 `prefers-reduced-motion: reduce` 时，图片切换动画时长自动归零。
- 使用 `Escape` 关闭，使用左右方向键切换图片。

## API

### Props

| 属性                | 类型                 | 默认值             | 说明                             |
| ------------------- | -------------------- | ------------------ | -------------------------------- |
| modelValue          | boolean              | false              | 是否显示预览                     |
| images              | `Array<string        | ImagePreviewItem>` | []                               | 图片列表                     |
| startPosition       | number               | 0                  | 每次打开时的起始索引             |
| loop                | boolean              | true               | 是否循环切换                     |
| showIndex           | boolean              | true               | 是否显示页码                     |
| showArrows          | boolean              | true               | 是否在宽屏显示前后切换按钮       |
| closeable           | boolean              | true               | 是否显示关闭按钮                 |
| closeOnClickOverlay | boolean              | true               | 是否允许点击图片外的空白区域关闭 |
| closeOnEsc          | boolean              | true               | 是否允许按 Escape 关闭           |
| swipeDuration       | number               | 300                | 切换动画时长，单位毫秒           |
| minZoom             | number               | 1                  | 最小缩放比例，最小为 1           |
| maxZoom             | number               | 3                  | 最大缩放比例                     |
| doubleTapZoom       | number               | 2                  | 双击后的缩放比例                 |
| teleport            | `TeleportProps['to'] | false`             | body                             | 挂载目标，false 表示原地渲染 |
| zIndex              | `number              | string`            | 1100                             | 层级                         |

### Events

| 事件名            | 回调参数                                              | 说明               |
| ----------------- | ----------------------------------------------------- | ------------------ |
| update:modelValue | value: boolean                                        | 显示状态变化       |
| change            | index: number, item?: ImagePreviewItem                | 当前图片变化       |
| scale             | scale: number, index: number, item?: ImagePreviewItem | 缩放比例变化       |
| close             | index: number, item?: ImagePreviewItem                | 发起关闭时触发     |
| closed            | -                                                     | 关闭动画结束后触发 |

### Slots

| 插槽名 | 参数                       | 说明           |
| ------ | -------------------------- | -------------- |
| image  | item, index, active, scale | 自定义图片区域 |
| index  | index, total               | 自定义页码     |
| footer | item, index                | 自定义底部说明 |

### 实例方法

| 方法       | 参数          | 说明                   |
| ---------- | ------------- | ---------------------- |
| close      | -             | 关闭预览               |
| next       | -             | 切换到下一张           |
| prev       | -             | 切换到上一张           |
| swipeTo    | index: number | 切换到指定索引         |
| resetScale | -             | 恢复默认缩放比例和位移 |

## 类型与工具导出

```ts
import type {
  ImagePreviewExpose,
  ImagePreviewInstance,
  ImagePreviewItem,
  ImagePreviewOptions,
  ImagePreviewProps,
  ImagePreviewSource,
} from '@kylin-design/vue-ui';
import {
  closeImagePreview,
  normalizeImagePreviewIndex,
  normalizeImagePreviewItem,
  showImagePreview,
  useImagePreview,
} from '@kylin-design/vue-ui';
```

## 样式变量

| 变量名                              | 说明           |
| ----------------------------------- | -------------- |
| --ky-image-preview-bg               | 全屏背景       |
| --ky-image-preview-color            | 文本与图标颜色 |
| --ky-image-preview-control-bg       | 控件背景       |
| --ky-image-preview-control-hover-bg | 控件悬停背景   |
| --ky-image-preview-caption-bg       | 图片说明背景   |
| --ky-image-preview-image-max-width  | 图片最大宽度   |
| --ky-image-preview-image-max-height | 图片最大高度   |
