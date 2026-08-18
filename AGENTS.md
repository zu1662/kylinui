# Kylin Design 仓库开发指引

## `packages/*` 子项目指引入口

修改 `packages/*` 下的代码前，必须先阅读目标包目录内的 `AGENTS.md`。包级规范与本文件同时生效；具体包内的约束优先采用对应包的说明。

- [`packages/vue-ui/AGENTS.md`](packages/vue-ui/AGENTS.md)：Vue UI 组件库开发、组件集成和包级验证要求。
- [`packages/doc-site/AGENTS.md`](packages/doc-site/AGENTS.md)：文档站、组件注册、预览同步和包级验证要求。

新增 `packages/<package-name>` 子项目时，应同时创建该包的 `AGENTS.md`，并在本节增加入口链接和职责说明。

## 必须加载的项目规范

- 阅读、修改、审查或记录本仓库代码时，使用 `.agents/skills/kylin-design-development/SKILL.md`。
- 修改 `packages/vue-ui` 时，同时使用 `packages/vue-ui/.agents/skills/development/SKILL.md`。
- 修改 `packages/doc-site` 时，同时使用 `packages/doc-site/.agents/skills/kylin-doc-site-development/SKILL.md`。
- 定位代码、增加组件、调整导出或修改文档站时，读取根级 Skill 的 `references/project-architecture.md`。
- 编写或审查 Vue、TypeScript、LESS、示例、配置实验台或组件文档前，读取根级 Skill 的 `references/coding-standards.md`。
- `design.md` 是设计系统的事实来源，`requirements.md` 记录初始项目范围；描述实现细节时以当前源码为准。

## 强制规则

- 使用 pnpm，并保持 `packages/*` 工作区结构。
- Vue 组件统一使用模板和 `<script setup lang="ts">`，不得引入 JSX。
- 公共组件类型放在组件 `.ts` 文件中，安装和导出逻辑放在 `index.ts` 中。
- CSS 类使用 `ky-` 前缀和 BEM，视觉值使用 Design Tokens；不得随意硬编码颜色，也不得复制组件制造视觉分支。
- 代码注释默认使用中文，只在解释非显而易见的原因、约束、兼容处理或清理条件时添加；禁止复述代码、保留注释掉的代码或写无完成条件的 TODO。
- 组件功能变更需要按实际影响同步实现、样式、导出、Demo、配置实验台、Markdown API 文档和文档站注册。
- 不得修改 `node_modules/`、`dist/`、`*.tsbuildinfo` 等安装或生成内容。

## AI 改动文件质量门禁

- AI 每次完成编码、配置或文档修改后，在最终回复前必须运行 `pnpm quality:changed`。
- 该命令仅处理当前 Git 工作区中新增或修改的文件：先使用 Prettier 写入格式，再按文件类型执行 ESLint 或 Stylelint，最后复核格式。
- 如果校验过程中再次修改了文件，必须重新运行该命令，直到成功通过；不得仅依赖仓库级检查替代改动文件校验。
- 涉及类型或构建结果的改动，仍需继续运行受影响包的 typecheck、build，以及下方适用的仓库级命令。
- 最终回复必须列出实际执行的格式、Lint、类型检查或构建命令及结果。

## 验证要求

迭代时先运行最小范围检查，跨包变更完成前优先运行：

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm build
```
