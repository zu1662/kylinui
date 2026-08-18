# 文档站开发说明

## 包职责

`packages/doc-site` 是 Vite + Vue 3 文档应用，负责：

- 组件导航和页面壳层
- 组件 Usage 配置实验台
- Markdown API 文档渲染
- iframe 移动端模拟器
- Demo 与 Usage 的隔离预览
- 全局主题选择及预览主题同步

## 核心文件

| 文件                                  | 职责                                        |
| ------------------------------------- | ------------------------------------------- |
| `src/main.ts`                         | 文档站入口和全局初始化                      |
| `src/App.vue`                         | 页面壳层、组件导航和主题交互                |
| `src/registry.ts`                     | 显式导入组件文档资源并维护 `ComponentEntry` |
| `src/types.ts`                        | 文档站核心类型                              |
| `src/preview.ts`                      | 预览模式、URL 和参数辅助方法                |
| `src/PreviewApp.vue`                  | 根据组件与模式渲染 Usage 或 Demo            |
| `src/components/ComponentPage.vue`    | 组合标题、实验台、Markdown 和基础 Demo      |
| `src/components/ConfigPlayground.vue` | 根据 `UsageConfig` 生成控件、预览和代码     |
| `src/components/MobileSimulator.vue`  | 承载移动端 iframe 预览                      |
| `src/composables/`                    | 文档站专用组合式逻辑                        |
| `src/styles/index.less`               | 文档站整体视觉和响应式布局                  |
| `vite.config.ts`                      | Vue 插件和组件库源码别名                    |

## 源码引用方式

Vite 和 TypeScript 将：

- `@kylinui/vue` 指向 `../vue-ui/src/index.ts`
- `@vue-ui/*` 指向 `../vue-ui/src/*`

这样文档站在开发环境中可以直接热更新组件库源码。不要把组件实现复制到文档站，也不要把 `dist` 作为本地开发依赖来源。

## Registry 契约

每个公共组件在 `src/registry.ts` 中包含四类导入：

```ts
import componentConfig from '@vue-ui/component/_usage/config';
import ComponentUsage from '@vue-ui/component/_usage/index.vue';
import ComponentDemo from '@vue-ui/component/_demo/basic.vue';
import componentDoc from '@vue-ui/component/_doc/component.md?raw';
```

并维护一个条目：

```ts
{
  slug: 'component',
  group: '组件分组',
  title: 'Component 中文名称',
  config: componentConfig,
  usage: ComponentUsage,
  demo: ComponentDemo,
  doc: componentDoc,
}
```

要求：

- `slug` 使用稳定 kebab-case，并与预览 URL 一致。
- `group` 使用已有导航分组，新增分组前检查页面排序和设计需求。
- `title` 与组件文档标题一致。
- 配置、Usage、Demo 和 Markdown 必须来自同一个组件目录。

## 配置实验台

- 数据结构以 `@vue-ui/usage` 中的 `UsageConfig` 为准。
- 控件值需要可安全传递给 Usage 组件。
- 生成的 Vue Template 或服务调用代码必须与当前配置一致。
- 服务式组件优先使用配置中的 `generateCode`。
- 不在文档站内重新实现组件默认值，默认值应来自并匹配组件 Usage 配置。

## Markdown 与预览

- `ComponentPage.vue` 使用 MarkdownIt 渲染原始 Markdown，默认 `html: false`。
- `MobileSimulator.vue` 通过 iframe 隔离移动端视口。
- `PreviewApp.vue` 根据 slug 和模式选择 Usage 或 Demo。
- 修改预览 URL、查询参数或主题同步时，应同时检查直接打开预览页和主文档页嵌入场景。
- 预览失败时应提供可理解的空状态或错误提示，不应静默渲染错误组件。

## 文档站注释补充规则

在遵循根级注释规范的基础上，以下文档站场景通常需要注释：

- 主文档页与 iframe 预览之间的 URL、模式和主题同步约束。
- MarkdownIt 安全选项、原始 HTML 限制或内容处理中的安全权衡。
- 桌面触控模拟、滚动边界和浏览器事件兼容处理。
- Registry 排序或分组存在无法从数据结构直接看出的产品约束。
- 为避免预览循环、状态污染或跨页面差异而采用的非直观逻辑。

以下场景不得增加注释：

- 逐条解释 Registry 的四个显式导入或 `ComponentEntry` 字段。
- 在 Vue 模板中为明显页面区块添加分隔注释。
- 在 LESS 中保留被注释掉的旧布局、调试边框或候选视觉值。
- 使用没有原因和完成条件的 `TODO`、`FIXME`、`HACK`。

## 样式与交互

- 文档站可定义布局样式，但颜色、字体、间距和圆角优先使用组件库 `--ky-*` Token。
- 不覆盖组件内部私有结构来修正文档展示；应修改 Demo 容器或组件自身。
- 保持桌面导航、窄屏布局、滚动区域和移动模拟器尺寸可用。
- 桌面触控模拟逻辑仅属于文档站，不得进入组件库发布代码。

## 验证命令

```bash
pnpm exec prettier --check "packages/doc-site/**/*.{ts,vue,less,md,json,html}"
pnpm lint:script
pnpm lint:style
pnpm --filter @kylinui/doc-site typecheck
pnpm --filter @kylinui/doc-site build
```

涉及交互或样式时，启动 `pnpm dev`，至少检查受影响组件页面、Usage 预览、Demo 预览和主题切换，并在结果中明确说明验证范围。
