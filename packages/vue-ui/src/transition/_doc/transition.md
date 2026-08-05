# Transition 动画

Transition 对 Vue 内置 `<Transition>` 做轻量封装，提供统一命名、默认节奏与可直接复用的移动端进出场动效。动效集合参考 siskin-next 的动画方案，并改为只过渡 `transform` / `opacity`，同时补充减少动态效果的系统偏好支持。

## 使用建议

- 动画用于解释状态变化，不应阻塞主要操作或替代状态反馈。
- 默认进入时长为 300ms、退出时长为 275ms；`fly` 的默认进入时长为 600ms。
- 默认插槽必须只有一个元素或组件，并由业务状态通过 `v-if` / `v-show` 控制。
- 方向名称表示元素的运动方向，例如 `slide-right` 从左侧进入并向右移动。
- 用户开启 `prefers-reduced-motion: reduce` 时，内置动效会缩短到 1ms。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(true);
</script>

<template>
  <button type="button" @click="visible = !visible">切换</button>
  <KyTransition name="fade-up">
    <div v-if="visible">动画内容</div>
  </KyTransition>
</template>
```

也可以只复用全局样式，并直接使用 Vue 原生组件：

```vue
<Transition name="ky-slide-up">
  <div v-if="visible">动画内容</div>
</Transition>
```

## 内置动画

| 分类          | 名称                                                     | 效果                             |
| ------------- | -------------------------------------------------------- | -------------------------------- |
| 透明度        | `fade`                                                   | 原地淡入淡出                     |
| 透明度 + 位移 | `fade-up` / `fade-down` / `fade-left` / `fade-right`     | 短距离移动并淡入淡出             |
| 整体滑动      | `slide-up` / `slide-down` / `slide-left` / `slide-right` | 从容器边缘完整滑入或滑出         |
| 缩放          | `zoom` / `punch`                                         | 从较小或较大的比例缩放到原始尺寸 |
| 弹性          | `bounce` / `fly`                                         | 带回弹或上抛节奏的关键帧动画     |
| 内容上浮      | `post-up`                                                | 短距离上浮并淡入淡出             |

## API

| 属性     | 类型                            | 默认值      | 说明                                                                |
| -------- | ------------------------------- | ----------- | ------------------------------------------------------------------- |
| name     | 内置名称 / string               | `fade`      | 内置短名称会转换为 `ky-*`，其他名称按自定义 Vue Transition 名称透传 |
| appear   | boolean                         | false       | 首次挂载时是否执行进入动画                                          |
| mode     | `default` / `in-out` / `out-in` | -           | 多元素切换时的执行顺序                                              |
| type     | `transition` / `animation`      | 自动识别    | 强制 Vue 使用指定的结束事件类型                                     |
| duration | number / `{ enter, leave }`     | `300 / 275` | 动画时长，单位毫秒；数字表示进出一致                                |
| disabled | boolean                         | false       | 是否跳过 Transition，直接渲染插槽                                   |

## 事件

组件转发常用生命周期事件，事件参数均为当前过渡元素：

- `before-enter` / `after-enter` / `enter-cancelled`
- `before-leave` / `after-leave` / `leave-cancelled`
- `before-appear` / `after-appear` / `appear-cancelled`

原生 Vue Transition 的其他属性和监听器会通过 `$attrs` 继续传入内部 `<Transition>`。

## 自定义动画

传入非内置名称时不会自动添加 `ky-` 前缀，可按 Vue Transition 类名约定声明样式：

```less
.product-card-enter-from,
.product-card-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

.product-card-enter-active,
.product-card-leave-active {
  transition:
    opacity 220ms ease,
    transform 220ms ease;
}
```

```vue
<KyTransition name="product-card">
  <ProductCard v-if="visible" />
</KyTransition>
```
