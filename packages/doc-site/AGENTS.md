# Doc Site 文档站开发指引

- 修改本包时，必须使用 `.agents/skills/kylin-doc-site-development/SKILL.md`。
- 同时遵循仓库根目录 `AGENTS.md` 和根级项目 Skill。
- 新增组件文档时，必须保持 Registry、Usage、Demo、Markdown 和预览模式一致。
- 注释仅用于 iframe 边界、URL 参数、主题同步、Markdown 安全策略或桌面触控模拟等非显而易见约束，并遵循根级注释规范。
- 不得修改本包的 `dist/`、`node_modules/` 或 `tsconfig.tsbuildinfo`。

完成文档站改动后，至少运行：

```bash
pnpm --filter @kylinui/doc-site typecheck
pnpm --filter @kylinui/doc-site build
```
