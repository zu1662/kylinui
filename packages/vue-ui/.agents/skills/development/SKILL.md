---
name: kylin-vue-ui-development
description: 用于修改 packages/vue-ui 内的 Vue 3 移动端组件、公共类型、安装导出、共享工具、LESS 样式、Design Tokens、主题、Usage、Demo 和组件 Markdown 文档。要求遵循组件目录契约、Ky/ky- 命名、语义化 API、无障碍规则及发布构建边界。
---

# Kylin Vue UI 组件库开发

使用本 Skill 开发和审查 `packages/vue-ui`，确保组件运行时、公共 API、发布样式与文档资产保持一致。

## 开始前

- 读取仓库根级 `.agents/skills/kylin-design-development/SKILL.md`。
- 读取 [references/component-development.md](references/component-development.md) 获取本包目录、组件模板和集成清单。
- 涉及视觉、交互、Token 或无障碍决策时，读取仓库根目录 `design.md` 对应章节。
- 先查找行为相似的现有组件，再决定是否新增 API、共享工具或组件。

## 实现流程

1. 明确公共 Props、Events、Slots、服务函数和类型是否变化。
2. 在 `<component>.ts` 和 `<component>.vue` 中完成类型与运行时闭环。
3. 在 `style/token.less` 和 `style/index.less` 中使用 Design Tokens 完成样式。
4. 同步本地 `index.ts`、组件库根级 `src/index.ts` 和 `src/style/components.less`。
5. 同步 `_usage`、`_demo`、`_doc`；公共组件还要同步文档站 `registry.ts`。
6. 运行格式、Lint、类型检查和构建，并准确报告未执行的交互验证。

## 强制规范

- 仅使用 Vue 模板和 `<script setup lang="ts">`，不得使用 JSX。
- 组件名使用 `KyXxx`，CSS 使用 `ky-` BEM。
- 公共类型放在非排除目录中，并通过本地 `index.ts` 导出。
- 属性应语义化且可枚举，不暴露任意品牌视觉值。
- 禁用、加载状态不得继续触发被阻止的事件。
- DOM、定时器、监听器和服务宿主必须具备环境保护和清理逻辑。
- 颜色、间距、圆角、阴影和动效优先使用已有 `--ky-*` Token。
- 仅为组件 API 隐含语义、SSR/兼容处理、服务宿主生命周期、异步时序或特殊 Token 决策添加中文注释；禁止注释显而易见的模板、Props 和样式规则。
- 不得编辑 `dist/`、`node_modules/` 或 `*.tsbuildinfo`。

## 完成标准

- 类型、实现、默认值和文档一致。
- 本地及根级导出完整，全量安装列表无遗漏。
- 聚合样式包含新增公共组件。
- Usage 默认值与组件默认值一致。
- Demo 覆盖主要变体和关键状态。
- Markdown 以用途描述开篇，并包含统一的 `API`、适用的 `事件`、`插槽` 或服务 API；不得使用 Vant 等第三方组件库作对照描述。
- 文档站可以通过 Registry 访问组件。
- 类型检查和构建通过，或已说明准确失败范围。
