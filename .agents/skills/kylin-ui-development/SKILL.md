---
name: kylin-ui-development
description: 用于 Kylin UI 仓库中的代码分析、功能实现、重构、审查和文档任务，包括 Vue 组件、Design Tokens、公共导出、Demo、配置实验台及文档站。执行本 Monorepo 的实际架构、组件文件契约、Vue/TypeScript/LESS 规范、集成步骤和质量门禁。
---

# Kylin UI 项目开发

使用本 Skill，确保仓库变更符合现有 Vue 3 移动端组件库架构和设计系统。

## 按任务加载规范

- 定位职责、增加或删除组件、调整包边界、导出、样式、主题、构建、预览或注册表时，读取 [references/project-architecture.md](references/project-architecture.md)。
- 编写或审查 Vue、TypeScript、LESS、配置实验台、Demo 或 Markdown API 文档前，读取 [references/coding-standards.md](references/coding-standards.md)。
- 修改 `packages/vue-ui` 时，继续读取 `packages/vue-ui/.agents/skills/development/SKILL.md`。
- 修改 `packages/doc-site` 时，继续读取 `packages/doc-site/.agents/skills/kylin-doc-site-development/SKILL.md`。
- 涉及视觉行为、Token、交互、无障碍或组件 API 决策时，读取 `design.md` 中对应章节。
- 仅在确认初始项目范围或组件目录要求时读取 `requirements.md`。

## 工作流程

1. **划定变更范围。** 判断是否影响组件库运行时代码、公共 API、样式和 Token、文档资产、文档站注册或构建配置。
2. **查找相邻范例。** 优先参考行为相似的现有组件，不创建并行实现；可复用逻辑优先使用共享工具。
3. **完成最小闭环。** 同步维护公共类型、运行时行为、样式、文档和示例。
4. **补齐集成点。** 根据架构说明更新导出、聚合样式、`_usage`、`_demo`、`_doc` 和文档站注册。
5. **执行验证。** 先格式化修改文件并运行局部检查，再运行受影响包或仓库级质量命令。
6. **准确报告。** 说明行为变化、修改文件、已运行验证和已知缺口；未执行的视觉或运行时验证不得描述为已通过。

## 强制约束

- 使用 Vue 模板与 `<script setup lang="ts">`，不得增加 JSX。
- 保持 TypeScript 严格模式，并在适用位置使用类型导入。
- 组件 API 必须语义化、有限且可枚举；可以使用 Token 或受控变体时，不暴露任意视觉值。
- 组件名使用 `Ky` 前缀，CSS 使用 `ky-` 前缀、BEM 元素/修饰符和 `is-`、`has-` 状态类。
- 使用全局及组件级 Design Tokens，不得在组件规则中散落品牌色、渐变、间距、圆角或阴影常量。
- 注释默认使用中文，必须解释“为什么”或约束条件；不得逐行复述代码、保留注释掉的实现或使用无完成条件的 TODO/FIXME。
- 不得修改 `node_modules/`、`dist/` 或 `*.tsbuildinfo`。
- 使用 pnpm；只有依赖发生明确变化时才修改 `pnpm-lock.yaml`。

## 完成检查清单

组件相关变更应检查所有适用项：

- 组件类型契约和 Vue 实现
- 组件 Token 文件和样式入口
- 本地 `index.ts` 安装与导出
- 组件库根级安装列表和命名导出
- 聚合组件样式导入
- `_usage/config.ts` 与 `_usage/index.vue`
- `_demo/basic.vue`
- `_doc/<component>.md`
- 文档站 `registry.ts`
- 无障碍、禁用、加载、错误、空状态和窄屏行为
- 格式化、Lint、类型检查和构建结果
