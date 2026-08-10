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
```

## 项目开发约定

- 使用 Vue 3 `<script setup lang="ts">` 与 hooks，不使用 JSX。
- 组件样式统一使用 Design Tokens，并将组件专属变量维护在对应的 `style/token.less` 中。
- 每个组件按职责拆分核心 Vue 文件、Demo、使用配置与说明文档。
- API 文档需完整说明属性、事件、插槽及可配置项。
- 文档站参考 TDesign 的组织方式，提供配置切换、效果预览与使用说明。
