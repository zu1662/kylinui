# ConfigProvider 全局配置

用于为一组组件统一设置 Kylin 主题、Design Tokens、浮层层级、组件文案、服务式组件默认值和 Teleport 容器。嵌套 Provider 会在父级配置上逐项合并。

## 基础用法

```vue
<KyConfigProvider theme="ocean">
  <KyButton>海盐蓝按钮</KyButton>
</KyConfigProvider>
```

## Locale 与服务默认值

```vue
<script setup lang="ts">
import type { ConfigProviderLocale, ConfigProviderServiceDefaults } from '@kylin-design/vue-ui';

const locale: Partial<ConfigProviderLocale> = {
  searchPlaceholder: '搜索当前页面',
  searchActionText: '收起',
};

const serviceDefaults: ConfigProviderServiceDefaults = {
  toast: { position: 'top', duration: 1600 },
  dialog: { confirmText: '知道了' },
  imagePreview: { loop: false, closeable: true },
};
</script>

<template>
  <KyConfigProvider :locale="locale" :service-defaults="serviceDefaults">
    <App />
  </KyConfigProvider>
</template>
```

`locale` 先继承父 Provider，再覆盖指定字段，未配置字段使用内置中文文案。`serviceDefaults` 对 Toast、Dialog 和 ImagePreview 分组浅合并；命令式调用中显式传入的选项优先级最高。

## 默认 Teleport 容器

```vue
<script setup lang="ts">
import { ref } from 'vue';

const portal = ref<HTMLElement | null>(null);
</script>

<template>
  <div ref="portal" class="portal" />
  <KyConfigProvider :teleport="portal || 'body'">
    <App />
  </KyConfigProvider>
</template>
```

浮层优先使用组件或服务调用的显式 `teleport`，其次使用最近的 ConfigProvider，最后回退到统一的 `[data-ky-overlay-container]`。传入 `false` 表示禁用 Teleport 并在当前组件位置原地渲染。

## 自定义 CSS 变量

```vue
<script setup lang="ts">
import type { ConfigProviderThemeVars } from '@kylin-design/vue-ui';

const themeVars: ConfigProviderThemeVars = {
  colorBrandStrong: '#1757a6',
  colorBrand900: '#123f7a',
  radiusMd: '999px',
};
</script>

<template>
  <KyConfigProvider :theme-vars="themeVars">
    <KyButton>品牌色圆角按钮</KyButton>
  </KyConfigProvider>
</template>
```

`themeVars` 的 camelCase 键会转换为 `--ky-*` CSS 变量，例如 `radiusMd` 转换为 `--ky-radius-md`；已经以 `--ky-` 开头的键保持不变。

## 局部与全局主题

```vue
<KyConfigProvider
  theme="midnight"
  theme-vars-scope="global"
  :theme-vars="{ colorBrand: '#7c5cff', radiusMd: '999px' }"
  :z-index="1600"
>
  <App />
</KyConfigProvider>
```

`local` 只在 Provider 容器设置主题和变量；`global` 会同步到 `document.documentElement`。多个 Provider 按挂载层级叠加，内层同名 locale、服务默认值和 Teleport 配置优先；内层卸载后恢复外层配置。`zIndex` 作为浮层默认层级同步给现有浮层体系。

## API

### Props

| 属性            | 类型                                          | 默认值                                | 说明                                               |
| --------------- | --------------------------------------------- | ------------------------------------- | -------------------------------------------------- |
| tag             | `keyof HTMLElementTagNameMap`                 | `'div'`                               | 根节点标签                                         |
| theme           | `'jade' \| 'ocean' \| 'sunset' \| 'midnight'` | `'jade'`                              | Kylin 主题                                         |
| zIndex          | `number`                                      | -                                     | 浮层组件未显式传值时使用的默认起始层级             |
| themeVars       | `Record<string, string \| number>`            | `{}`                                  | 覆盖的 `--ky-*` CSS 变量                           |
| themeVarsScope  | `'local' \| 'global'`                         | `'local'`                             | 主题和 CSS 变量的作用范围                          |
| locale          | `Partial<ConfigProviderLocale>`               | `{}`                                  | 组件公共文案覆盖                                   |
| serviceDefaults | `ConfigProviderServiceDefaults`               | `{}`                                  | Toast、Dialog、ImagePreview 的默认选项             |
| teleport        | `TeleportProps['to'] \| false`                | ConfigProvider 配置，否则统一浮层容器 | Popup 体系与服务式浮层的默认容器；`false` 原地渲染 |

### Locale 字段

| 字段                   | 默认值               | 使用位置              |
| ---------------------- | -------------------- | --------------------- |
| searchPlaceholder      | `'请输入搜索关键词'` | Search 占位文案       |
| searchActionText       | `'取消'`             | Search 右侧操作文案   |
| searchClearLabel       | `'清空搜索内容'`     | Search 清除按钮标签   |
| searchLoadingText      | `'搜索中'`           | Search 加载状态       |
| searchSuggestionsLabel | `'搜索建议'`         | Search 建议列表标签   |
| imageLoadingText       | `'图片加载中'`       | Image 加载状态        |
| imageErrorText         | `'图片加载失败'`     | Image 最终失败状态    |
| skeletonLoadingLabel   | `'内容加载中'`       | Skeleton 加载区域标签 |
| emptyDescription       | `'暂无内容'`         | Empty 默认描述        |
| navBarBackLabel        | `'返回'`             | NavBar 返回按钮标签   |

### Service Defaults

| 字段         | 类型                            | 说明                                              |
| ------------ | ------------------------------- | ------------------------------------------------- |
| toast        | `Partial<ToastOptions>`         | `showToast` 等 Toast 服务默认选项                 |
| dialog       | `Partial<DialogServiceOptions>` | `showDialog`、`showAlert`、`showConfirm` 默认选项 |
| imagePreview | `Partial<ImagePreviewOptions>`  | `showImagePreview` 默认选项                       |

### 插槽

| 名称    | 说明                     |
| ------- | ------------------------ |
| default | 接收 Provider 配置的内容 |

### 导出类型与组合式函数

```ts
import {
  CONFIG_PROVIDER_KEY,
  ZH_CN_LOCALE,
  mapThemeVarsToStyle,
  useConfigProvider,
} from '@kylin-design/vue-ui';

import type {
  ConfigProviderContext,
  ConfigProviderLocale,
  ConfigProviderProps,
  ConfigProviderServiceDefaults,
  ConfigProviderTag,
  ConfigProviderTeleport,
  ConfigProviderThemeVars,
  ConfigProviderThemeVarValue,
  ConfigProviderThemeVarsScope,
} from '@kylin-design/vue-ui';
```

`useConfigProvider()` 返回当前注入上下文以及响应式 `locale`、`serviceDefaults`、`teleport`。未处于 Provider 内时使用内置中文文案、空服务默认值和统一浮层容器。

ConfigProvider 暂不提供 `namespace` 与 `iconResolver`：当前只有 `ky-` 命名空间并统一使用 KyIcon。减少动态效果也不作为 Provider 开关，各组件直接响应系统 `prefers-reduced-motion` 媒体查询。
