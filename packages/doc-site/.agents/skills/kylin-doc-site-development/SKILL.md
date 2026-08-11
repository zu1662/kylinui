---
name: kylin-doc-site-development
description: 用于修改 packages/doc-site 内的 Vue 文档站，包括应用壳层、组件 Registry、配置实验台、Markdown 渲染、移动端 iframe 预览、主题切换、文档站组合式函数和 LESS 样式。要求保持组件资源显式注册、源码别名、预览模式和文档类型契约一致。
---

# Kylin Doc Site 文档站开发

使用本 Skill 开发和审查 `packages/doc-site`，确保导航、文档、配置实验台和隔离预览与组件库源码保持同步。

## 开始前

- 读取仓库根级 `.agents/skills/kylin-design-development/SKILL.md`。
- 读取 [references/doc-site-development.md](references/doc-site-development.md) 获取页面职责、Registry 和预览流程。
- 修改某个组件的 Usage、Demo 或 Markdown 时，同时读取 `packages/vue-ui/.agents/skills/development/SKILL.md`。
- 保留 Vite 源码别名，除非任务明确要求改变组件库接入方式。

## 实现流程

1. 判断变更属于应用壳层、Registry、文档渲染、配置实验台、预览容器、主题或站点样式。
2. 检查 `ComponentEntry`、`UsageConfig` 和预览模式的数据流。
3. 使用现有组件和组合模式实现最小改动，不复制组件库运行时逻辑。
4. 新增组件文档时同步四类资源导入和一个 Registry 条目。
5. 验证桌面导航、移动预览、主题、Markdown 和代码生成的受影响路径。
6. 运行类型检查和构建，并说明是否执行浏览器视觉验证。

## 强制规范

- 使用 Vue 模板和 `<script setup lang="ts">`，不得引入 JSX。
- 文档站通过别名直接引用 `packages/vue-ui/src`，不得复制组件源码到本包。
- `registry.ts` 使用显式静态导入，保持 slug、group、title 和资源对应关系。
- Markdown 默认禁止原始 HTML；改变渲染安全策略必须有明确需求和风险说明。
- iframe 预览、URL 参数和主题值必须经过现有类型或解析函数处理。
- 文档站样式使用 `ky-` Design Tokens，避免与组件库重复定义主题值。
- 仅为 iframe 隔离、预览 URL、主题跨页面同步、Markdown 安全配置或触控模拟的非显而易见原因添加中文注释；禁止解释显而易见的 Registry 导入、模板结构或样式分区。
- 不得修改 `dist/`、`node_modules/` 或 `tsconfig.tsbuildinfo`。

## 完成标准

- 导航项和 Registry 条目一致。
- Config Playground 默认值、控件和生成代码正确。
- Usage 与 Demo 能在隔离预览模式中渲染。
- Markdown API 与组件真实导出一致。
- 主题在主页面和 iframe 预览中同步。
- 新增样式不破坏移动模拟器和窄屏布局。
- 类型检查和构建通过，或已说明准确失败范围。
