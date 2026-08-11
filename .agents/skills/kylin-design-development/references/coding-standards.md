# 编码规范

## 实现决策顺序

开始编码前依次判断：

1. 是否已有相同能力的组件或共享工具？
2. 是否能通过现有语义化变体满足需求？
3. 是否能提取共享行为且不影响无关 API？
4. 最后才增加新组件或公共 API。

不得复制现有组件并改名形成分叉实现。

## Vue 与 TypeScript

- 使用 `<script setup lang="ts">` 和 Vue 模板，不得引入 JSX。
- 使用 `defineOptions({ name: 'KyXxx' })` 声明组件名；只有需要明确分发属性时才设置 `inheritAttrs: false`。
- 导出的 Props、选项联合类型、事件载荷和纯解析函数放在 `<component>.ts`。
- 默认值使用 `withDefaults(defineProps<Props>(), ...)`，事件使用带元组载荷的类型化 `defineEmits`。
- 受控值默认采用 Vue 的 `modelValue` / `update:modelValue` 约定，除非同类组件已经形成更具体的契约。
- 渲染派生状态使用 `computed`；`watch` 仅用于同步或副作用。定时器、监听器、观察器和服务宿主必须清理。
- 模块求值、构建或 SSR 期间可能执行的 DOM 代码，应使用 `typeof document/window !== 'undefined'` 保护。
- 优先使用小型纯函数或职责清晰的组合式函数，避免大型内联处理器；只有真实跨组件复用时才放入 `src/shared`。
- 纯类型使用 `import type`。避免 `any`；通用或不可信边界使用 `unknown` 并进行收窄。
- 有意未使用的参数以 `_` 开头，以符合 ESLint 配置。
- 未明确要求破坏性变更时，保持已导出的 Props、Events、Slots、函数和类型兼容。

## 代码注释条件与限制

### 必须添加注释的情况

只有代码本身无法清楚表达原因或约束时才添加注释，重点包括：

- 行为依赖 `design.md`、业务约束、历史兼容或浏览器差异，且从类型和命名中无法推断。
- 使用临时兼容方案、框架规避方案或性能权衡时，需要说明原因、影响范围和可删除条件。
- 状态机、异步竞态、定时顺序、滚动锁定、焦点管理或资源清理存在非显而易见的执行顺序。
- 正则表达式、坐标换算、边界算法、复杂数据归一化或无障碍决策不容易通过拆分和命名解释。
- 公共 API 的单位、默认行为、副作用、环境限制或兼容性无法通过 TypeScript 类型完整表达。
- 临时 `TODO` 确有必要时，必须写明阻塞原因和明确完成或删除条件；已有任务编号时同时标注编号。

### 禁止添加或保留的注释

- 禁止复述语法或显而易见的代码，例如“设置变量”“遍历数组”“点击时关闭”。
- 禁止为了增加注释数量而添加文件头说明、区域分隔线或对每个 Props、方法、模板区块逐项解释。
- 禁止提交被注释掉的旧代码、调试代码、备选实现或无效 CSS 声明；应依赖版本历史。
- 禁止使用没有原因和完成条件的 `TODO`、`FIXME`、`HACK`。
- 禁止保留与当前实现、默认值、事件载荷或 Token 已不一致的注释。
- 通过清晰命名、类型或函数拆分即可表达时，优先重构代码而不是增加长注释。

### 注释写法

- 默认使用中文；标准名、API 名、浏览器名和代码标识符保留原文。
- 注释解释“为什么这样做”“受什么约束”“何时可以删除”，不要翻译下一行代码。
- 注释放在被解释的最小代码单元正上方，保持简短；避免远离目标的总括性注释和行尾长注释。
- 公共 API 仅在类型不足以表达语义时使用 JSDoc；局部实现原因使用普通行注释。
- Vue 模板注释只用于 Teleport、可访问性或结构边界等不明显约束；LESS 注释只用于 Token、兼容性或特殊级联原因。
- 修改相关代码时必须同步修改或删除注释，代码审查应将过期注释视为缺陷。

## 组件 API

- 暴露 `variant`、`size`、`tone`、`status`、`placement` 等语义化有限选项。
- 能使用受控变体或 Design Token 时，不暴露任意颜色、渐变、圆角、阴影或高度。
- 默认行为必须可预期，并在 TypeScript 默认值和 Markdown 表格中保持一致。
- 事件名描述用户意图或状态变化，文档中说明载荷；禁用或加载状态不得继续触发被阻止的操作。
- 有意义的内容定制使用 Slot，同时保留默认内容和无障碍行为。
- Dialog、Toast 等服务式 API 在 `document` 不可用时必须安全，并显式声明公共返回类型。

## 无障碍与移动端行为

- 优先使用原生交互元素，而不是给普通元素补 ARIA 角色。
- 保持键盘操作、焦点可见性、禁用语义和无障碍名称。
- 原生语义不足时，为加载、展开、选中、错误、模态或忙碌状态补充 `aria-*`。
- 纯图标操作必须有标签和足够触控区域。
- 兼容减少动态效果、安全区、窄屏、长文本和动态内容。
- Overlay、Dialog、Popup 必须有明确关闭路径，并正确清理滚动锁定、焦点和遮罩交互。

## 样式与 Token

- 组件样式放在组件 `style/` 目录中；不得使用绕过聚合发布的组件内 `<style scoped>`。
- 组件存在本地 Token 时，`style/index.less` 首行引入 `@import './token.less';`。
- 类名使用 `ky-<block>`、`ky-<block>__<element>` 和 `ky-<block>--<modifier>`。
- 临时状态使用 `is-*`，能力或内容状态使用 `has-*`。
- 优先使用已有全局 `--ky-*` Token；必要时在 `style/token.less` 定义组件别名或默认尺寸。
- 不得硬编码品牌色或复制主题专属组件规则；语义或主题差异应集中到 Token。
- 避免任意 z-index，遵循现有浮层层级。
- 选择器必须局限于组件，不依赖未记录的业务页面类名。
- Prettier 负责排版，Stylelint 负责 LESS 语法和属性顺序。

## 组件入口和导出

遵循现有本地入口模式：

```ts
import Component from './component.vue';
import { withInstall } from '../shared/with-install';

export type { ComponentProps } from './component';
export const KyComponent = withInstall(Component, 'KyComponent');
export default KyComponent;
```

复合组件需要一致地导出并安装所有预期公开的子组件。服务式组件需要从本地 `index.ts` 导出服务函数及公共选项、结果类型。

## 配置实验台

- `_usage/config.ts` 默认导出的对象必须使用 `satisfies UsageConfig`。
- 使用 `src/usage.ts` 支持的控件类型：`boolean`、`select`、`text`、`number`。
- `defaultValue` 必须与组件真实默认值一致。
- 仅在有意义时增加 `options`、`min`、`max` 和 `step`。
- `_usage/index.vue` 接收 `configProps: Record<string, unknown>`，并显式绑定或转换配置值。
- 服务式 API 或普通模板生成会产生误导时，使用 `generateCode`。

## Demo 与 Markdown 文档

- `_demo/basic.vue` 展示代表性变体和关键状态，不重复配置实验台。
- 组件支持时，应覆盖加载、禁用、错误、空状态、边界或交互状态。
- `_doc/<component>.md` 按实际情况包含：
  - 用途和使用建议
  - 导入及基础示例
  - Props 表格，包括类型和默认值
  - Events 表格，包括载荷
  - Slots 表格
  - 服务或组合式 API
  - 无障碍或行为说明
- 文档、示例和实际导出名称必须一致。

## 文档站集成

每个公共组件都需要在 `packages/doc-site/src/registry.ts` 中显式导入：

- `_usage/config.ts`
- `_usage/index.vue`
- `_demo/basic.vue`
- `_doc/<component>.md?raw`

然后增加一个 `ComponentEntry`，使用稳定的 kebab-case slug、正确导航分组、可读标题和对应导入资源。

## 格式化与验证

迭代时优先运行局部检查。完成较大的组件或跨包变更前运行：

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm build
```

格式检查失败时，运行 `pnpm format`，检查改动后再次验证。仓库当前没有独立自动化测试套件，因此不得声称已有测试覆盖；适用时通过文档预览验证交互，并明确报告是否执行。

## 代码审查清单

- 公共 API 和默认值已类型化并写入文档。
- 运行状态不会触发重复或被禁止的操作。
- 定时器、监听器和 DOM 宿主均能清理。
- 注释只覆盖必要原因和约束，且不存在过期、复述代码或无完成条件的注释。
- SSR 或构建阶段的 DOM 访问已保护。
- 样式使用 Token，并兼容所有主题。
- 键盘、焦点、标签和触控区域可用。
- 导出、聚合样式、Usage、Demo、文档和 Registry 已同步。
- 未修改生成目录。
- 必要命令已通过，或已准确说明失败范围。
