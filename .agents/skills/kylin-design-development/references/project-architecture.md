# 项目架构

## 仓库定位

Kylin Design 是一个 pnpm workspace，包含 Vue 3 移动端组件库及其文档站。项目实现遵循 `design.md`，`requirements.md` 记录初始包结构和组件目录要求。

```text
kylin-design/
├─ package.json                 # 根级脚本及公共检查工具
├─ pnpm-workspace.yaml          # packages/* 工作区
├─ design.md                    # 设计系统事实来源
├─ requirements.md              # 初始工程范围
├─ eslint.config.mjs
├─ prettier.config.mjs
├─ stylelint.config.mjs
├─ tsconfig.base.json
└─ packages/
   ├─ vue-ui/                   # 可发布组件库源码
   └─ doc-site/                 # Vite 文档与预览应用
```

## 根级工具链

- 包管理器：pnpm。
- 语言与框架：Vue 3.5、TypeScript、Vite、LESS。
- 质量工具：ESLint 检查 TS/Vue，Stylelint 检查 LESS，Prettier 负责格式，`vue-tsc` 负责类型检查。
- 根级常用命令：

```bash
pnpm dev
pnpm format:check
pnpm lint
pnpm typecheck
pnpm build
```

## `packages/vue-ui`

该包负责运行时组件、公共类型、主题和发布样式。

```text
packages/vue-ui/
├─ src/
│  ├─ index.ts                  # 全量插件、命名导出、基础和组件样式
│  ├─ usage.ts                  # 文档实验台元数据类型，不进入发布声明
│  ├─ style/
│  │  ├─ tokens.less            # 基础、语义、主题、排版和间距 Token
│  │  ├─ index.less             # 重置与基础样式
│  │  └─ components.less        # 汇总所有公共组件样式
│  ├─ theme/index.ts            # 主题名称和 DOM 主题辅助方法
│  ├─ shared/                   # 可复用安装工具、运行时工具和组合式函数
│  └─ <component>/              # 每个组件一个目录
├─ vite.config.ts               # ES、UMD 组件库构建和类型声明
└─ package.json
```

### 组件目录契约

常规组件采用以下结构：

```text
<component>/
├─ index.ts                     # withInstall、默认导出和公共类型导出
├─ <component>.ts               # 公共 Props、类型及纯函数
├─ <component>.vue              # 运行时实现
├─ style/
│  ├─ token.less                # 组件级 CSS 自定义属性
│  └─ index.less                # 引入 token.less 并定义 BEM 规则
├─ _usage/
│  ├─ config.ts                 # 配置实验台 UsageConfig
│  └─ index.vue                 # 接收 configProps 并渲染实时示例
├─ _demo/basic.vue              # 独立基础示例和状态覆盖
└─ _doc/<component>.md          # 说明、示例、Props、Events、Slots 和注意事项
```

复合组件或服务式组件可以在此契约旁增加文件。例如 `cell`、`grid` 包含子组件文件，`icon` 包含资源和辅助方法，`dialog`、`toast` 包含服务宿主。只有职责确实独立时才增加文件。

### 公共集成点

增加或删除公共组件时，同步维护：

1. `packages/vue-ui/src/<component>/index.ts`
2. `packages/vue-ui/src/index.ts`
   - 导入组件
   - 将需要全量安装的组件加入 `components`
   - 导出组件模块
3. `packages/vue-ui/src/style/components.less`
4. `packages/doc-site/src/registry.ts`
5. 组件对应的 `_usage`、`_demo` 和 `_doc` 文件

`vite-plugin-dts` 会从发布声明中排除 `_usage`、`_demo`、`_doc` 和 `src/usage.ts`。运行时公共类型不得放进这些目录。

## `packages/doc-site`

该包直接引用组件库源码并提供文档和预览能力。

```text
packages/doc-site/
├─ src/
│  ├─ main.ts / App.vue         # 应用入口、导航和主题选择
│  ├─ registry.ts               # 显式组件导入及 ComponentEntry 列表
│  ├─ types.ts                  # 文档注册类型
│  ├─ preview.ts                # 预览 URL 和状态辅助方法
│  ├─ PreviewApp.vue            # 隔离渲染 Usage 和 Demo
│  ├─ components/
│  │  ├─ ComponentPage.vue      # Markdown、实验台和 Demo 页面组合
│  │  ├─ ConfigPlayground.vue   # UsageConfig 控件和代码生成
│  │  └─ MobileSimulator.vue    # iframe 移动端预览容器
│  ├─ composables/              # 文档站专用行为
│  └─ styles/index.less         # 文档站样式
├─ vite.config.ts
└─ package.json
```

Vite 别名将 `@kylin-design/vue-ui` 和 `@vue-ui` 指向 `packages/vue-ui/src`，因此组件修改无需先构建组件库即可热更新。

`registry.ts` 使用显式注册：每个组件分别导入配置、Usage、Demo 和原始 Markdown，然后增加一个 `ComponentEntry`。缺少注册项、分组、标题或 slug 时，新组件不算完整接入文档站。

## 修改职责映射

| 变更类型         | 主要文件                                               | 必须同步检查                          |
| ---------------- | ------------------------------------------------------ | ------------------------------------- |
| 组件行为或 API   | `<component>.ts`、`<component>.vue`                    | 导出、Usage、Demo、文档               |
| 组件外观         | `style/token.less`、`style/index.less`                 | `design.md` 对应规则、Demo 状态       |
| 新增组件         | 完整组件目录                                           | 根级导出/安装列表、聚合样式、Registry |
| 共享行为         | `src/shared/*`                                         | 迁移调用方，避免组件分叉              |
| 全局或主题 Token | `src/style/tokens.less`、`src/theme/index.ts`          | 所有主题和文档站主题选择器            |
| 实验台元数据     | `_usage/config.ts`、`_usage/index.vue`、`src/usage.ts` | 代码生成和预览行为                    |
| 文档页面         | `_doc/*.md`、`_demo/basic.vue`、`registry.ts`          | Markdown 渲染和 iframe 预览           |
| 构建或包 API     | 包清单、Vite/TS 配置                                   | 两个包的类型检查和根级构建            |

## 生成内容和外部内容

不得手动修改：

- `node_modules/`
- 各包的 `dist/`
- `*.tsbuildinfo`

通过包脚本重新生成构建产物。只有依赖发生明确变化时才更新 `pnpm-lock.yaml`。
