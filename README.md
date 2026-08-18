# Kylin Design

基于 [design.md](./design.md) 设计规范构建的 Vue 3 移动端组件库 Monorepo。

## Packages

- `packages/vue-ui`：移动端组件库与 Design Tokens
- `packages/doc-site`：组件文档站，提供配置切换、示例预览与 API 说明

## 本地开发

```bash
pnpm install
pnpm dev
```

## 构建与检查

```bash
pnpm typecheck
pnpm build
pnpm release:check
```

`release:check` 面向组件库发布，覆盖通配符子路径导出校验、ES/CommonJS/UMD 多入口构建、组件级样式、Tree Shaking、SSR 无 DOM 加载和 bundle-size 门禁。`pnpm pack` 会通过组件包的 `prepack` 自动执行同一套检查。

## 项目开发约定

- 使用 Vue 3 `<script setup lang="ts">` 与 hooks，不使用 JSX。
- 组件样式统一使用 Design Tokens，并将组件专属变量维护在对应的 `style/token.less` 中。
- 每个组件按职责拆分核心 Vue 文件、Demo、使用配置与说明文档。
- API 文档需完整说明属性、事件、插槽及可配置项。
- 文档站提供配置切换、效果预览与使用说明。

## GitHub Pages 部署

仓库内置 `.github/workflows/deploy-doc-site.yml`。推送到 `master` 分支后，GitHub Actions 会自动构建 `packages/doc-site` 并部署到 GitHub Pages；也可以在 Actions 页面手动触发。

首次使用时，请在 GitHub 仓库的 `Settings > Pages > Build and deployment` 中将 `Source` 设置为 `GitHub Actions`。项目站点默认发布到 `https://<owner>.github.io/<repository>/`，工作流会自动注入对应的二级目录基础路径。
