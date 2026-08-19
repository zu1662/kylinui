# @kylinui/vue

Kylin UI 的 Vue 3 移动端组件库。

## 安装

```bash
npm i @kylinui/vue
```

## 全量使用

```ts
import KylinUI from '@kylinui/vue';
import '@kylinui/vue/style.css';

app.use(KylinUI);
```

## 按需使用

组件脚本通过固定通配符规则提供 ES Module 与 CommonJS 子路径，无需在 `package.json` 中逐项枚举组件。样式入口会自动包含该组件运行时依赖的组件样式，基础 Token 与页面重置只需引入一次。

```ts
import { KyButton } from '@kylinui/vue/button';
import '@kylinui/vue/base.css';
import '@kylinui/vue/button/style.css';
```

主题工具等无样式模块也可以通过子路径引入：

```ts
import { setKylinTheme } from '@kylinui/vue/theme';
```

## 发布验证

```bash
pnpm --filter @kylinui/vue release:check
```

该命令会重新构建 ES、CommonJS、UMD、类型声明、全量样式和组件级样式，并检查：

- `package.json` 仅保留固定通配符导出规则，且所有源码公共入口均有对应声明、ES、CommonJS 和样式产物；
- 根入口命名导入与组件子入口可以被 Tree Shaking；
- SSR 构建产物可以在无 `document` 的 Node 环境加载；
- 入口脚本、UMD、全量样式和基础样式不超过 `bundle-size.config.mjs` 的 gzip 预算。

`pnpm pack` 与发布流程会通过 `prepack` 自动执行同一套门禁，并在 `dist/bundle-size-report.json` 生成体积报告。
