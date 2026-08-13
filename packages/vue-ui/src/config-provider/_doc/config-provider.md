# ConfigProvider 全局配置

ConfigProvider 用于为一组组件统一设置 Kylin 主题、CSS 变量和浮层默认层级，既支持局部配置，也支持写入页面根节点的全局配置。

## 使用建议

- 应用根节点需要统一主题时，将 `theme-vars-scope` 设置为 `global`。
- 同一页面展示多个品牌区域或主题预览时，保留默认的 `local` 作用域，避免互相覆盖。
- `themeVars` 的 camelCase 键会自动转换为 `--ky-*` CSS 变量，例如 `buttonRadius` 转换为 `--ky-button-radius`。
- 多个全局 ConfigProvider 会按挂载顺序叠加，后挂载的主题和同名变量优先；卸载后会恢复下层配置或页面原值。

## 基础用法

```vue
<KyConfigProvider theme="ocean">
  <KyButton>海盐蓝按钮</KyButton>
</KyConfigProvider>
```

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

## 全局配置

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

`global` 作用域会将 `theme` 与 `themeVars` 写入 `document.documentElement`。`zIndex` 始终是全局配置，Popup、Dialog、ActionSheet、ImagePreview、NumberKeyboard 和 Toast 在没有显式设置 `zIndex` 时会读取该值。

## API

| 属性           | 类型                                          | 默认值    | 说明                                             |
| -------------- | --------------------------------------------- | --------- | ------------------------------------------------ |
| tag            | `keyof HTMLElementTagNameMap`                 | `'div'`   | 根节点标签                                       |
| theme          | `'jade' \| 'ocean' \| 'sunset' \| 'midnight'` | `'jade'`  | Kylin 主题；局部作用于容器，全局作用于页面根节点 |
| themeVars      | `Record<string, string \| number>`            | `{}`      | 需要覆盖的 `--ky-*` CSS 变量                     |
| themeVarsScope | `'local' \| 'global'`                         | `'local'` | CSS 变量及页面主题的作用范围                     |
| zIndex         | `number`                                      | -         | 浮层组件未显式传值时使用的全局起始层级           |

## 插槽

| 名称    | 说明               |
| ------- | ------------------ |
| default | 接收全局配置的内容 |

## 类型

组件导出以下公共类型和上下文键：

```ts
import type {
  ConfigProviderProps,
  ConfigProviderTag,
  ConfigProviderThemeVars,
  ConfigProviderThemeVarValue,
  ConfigProviderThemeVarsScope,
  ConfigProviderContext,
} from '@kylin-design/vue-ui';

import { CONFIG_PROVIDER_KEY, mapThemeVarsToStyle } from '@kylin-design/vue-ui';
```
