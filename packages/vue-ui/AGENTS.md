# Vue UI 组件库开发指引

- 修改本包时，必须使用 `.agents/skills/development/SKILL.md`。
- 同时遵循仓库根目录 `AGENTS.md` 和根级项目 Skill。
- 新增或修改公共组件时，必须同步类型、Vue 实现、样式、导出、Usage、Demo、Markdown 文档及文档站注册。
- 注释仅用于组件契约、兼容处理、SSR、异步时序、资源清理或 Design Token 例外等非显而易见约束，并遵循根级注释规范。
- 不得修改本包的 `dist/`、`node_modules/` 或生成声明。

完成组件库改动后，至少运行：

```bash
pnpm --filter @kylin-design/vue-ui typecheck
pnpm --filter @kylin-design/vue-ui build
```
