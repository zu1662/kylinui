# 组件开发说明

## 包职责

`packages/vue-ui` 是可发布的 Vue 3 移动端组件库，负责：

- 组件运行时代码和公共 TypeScript 类型
- 全量安装插件及按需导出
- 全局、语义、主题和组件级 Design Tokens
- 组件聚合样式
- 文档站使用的 Usage、Demo 和 Markdown 源文件

## 核心入口

| 文件                        | 职责                                                 |
| --------------------------- | ---------------------------------------------------- |
| `src/index.ts`              | 引入全局样式、维护全量安装组件列表、导出所有公共模块 |
| `src/style/index.less`      | 基础重置和全局样式                                   |
| `src/style/tokens.less`     | 全局及多主题 Token                                   |
| `src/style/components.less` | 汇总所有公共组件的 `style/index.less`                |
| `src/theme/index.ts`        | 主题类型、选项和 DOM 主题切换方法                    |
| `src/shared/`               | 跨组件复用工具和组合式函数                           |
| `src/usage.ts`              | 文档配置实验台类型，不属于发布 API                   |
| `vite.config.ts`            | ES/UMD 构建及声明文件生成规则                        |

## 标准组件结构

```text
<component>/
├─ index.ts
├─ <component>.ts
├─ <component>.vue
├─ style/
│  ├─ token.less
│  └─ index.less
├─ _usage/
│  ├─ config.ts
│  └─ index.vue
├─ _demo/basic.vue
└─ _doc/<component>.md
```

- `index.ts` 使用 `withInstall`，导出默认组件、命名组件和公共类型。
- `<component>.ts` 保存 Props、枚举联合类型、事件载荷和可测试纯函数。
- `<component>.vue` 保存模板与运行时状态，不重复声明公共类型。
- `style/token.less` 保存组件局部 CSS 自定义属性。
- `style/index.less` 引入 Token，并使用 `ky-` BEM 类。
- `_usage` 服务于文档站配置实验台。
- `_demo` 展示代表性使用方式和关键状态。
- `_doc` 记录 API、行为和无障碍说明。

复合组件可以增加子组件文件；Dialog、Toast 等服务式组件可以增加 service 或 host 文件，但不得省略适用的标准文件。

## API 与运行时要求

- 使用 `defineOptions({ name: 'KyXxx' })`。
- Props 使用独立接口，默认值使用 `withDefaults`。
- Events 使用带载荷元组的 `defineEmits`。
- 受控值默认使用 `modelValue` 和 `update:modelValue`。
- 渲染派生状态优先使用 `computed`。
- `watch`、定时器和 DOM 监听只用于必要副作用，并在卸载时清理。
- 服务式组件在 `document` 不存在时不得抛错。
- 避免 `any`，公共返回值显式声明类型，纯类型使用 `import type`。

## 组件库注释补充规则

在遵循根级注释规范的基础上，以下组件库场景通常需要注释：

- Dialog、Toast 等服务式组件的单例宿主创建、卸载条件和 SSR 保护。
- 禁用、加载、防重复提交或受控值同步中不直观的事件拦截原因。
- 定时器、Transition、滚动锁定、焦点恢复和监听器清理的顺序约束。
- 浏览器、Vue 或构建工具兼容方案，以及该方案可以删除的条件。
- 与 `design.md` 默认规则不同但经过确认的 Token 或交互例外。
- 公共 API 中无法由类型表达的单位、副作用、环境限制和默认回退。

以下场景不得增加注释：

- 仅解释 Props 名称、`computed` 返回值、事件绑定或 BEM 类名。
- 在模板中用注释划分“标题区”“内容区”“按钮区”等明显结构。
- 保留旧实现、实验代码、调试输出或被注释掉的 LESS 声明。
- 使用没有原因和删除条件的 `TODO`、`FIXME`、`HACK`；已有任务编号时还必须标注编号。

## 样式要求

- 不使用组件内 `<style scoped>` 代替发布样式。
- 不硬编码品牌色、主题色或重复主题组件规则。
- 优先使用 `src/style/tokens.less` 中现有 Token。
- 组件特定尺寸或别名放在 `style/token.less`。
- 状态类使用 `is-*`，内容或能力类使用 `has-*`。
- 保持焦点可见、禁用语义、触控区域和减少动态效果支持。

## 新增公共组件集成清单

1. 创建完整组件目录。
2. 在组件 `index.ts` 中完成安装和导出。
3. 在 `src/index.ts` 中导入组件并加入全量安装数组。
4. 在 `src/index.ts` 中增加模块导出。
5. 在 `src/style/components.less` 中引入组件样式。
6. 增加 `_usage/config.ts`、`_usage/index.vue`。
7. 增加 `_demo/basic.vue`。
8. 增加 `_doc/<component>.md`。
9. 在 `packages/doc-site/src/registry.ts` 中增加四类资源导入和 `ComponentEntry`。

## 验证命令

```bash
pnpm exec prettier --check "packages/vue-ui/**/*.{ts,vue,less,md,json}"
pnpm lint:script
pnpm lint:style
pnpm --filter @kylin-design/vue-ui typecheck
pnpm --filter @kylin-design/vue-ui build
```

只改少量文件时可以先运行针对性检查，但完成公共 API 或构建相关修改前必须执行包级类型检查和构建。
