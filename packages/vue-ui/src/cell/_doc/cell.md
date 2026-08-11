# Cell 单元格

Cell 用于展示列表中的一项信息或操作入口，CellGroup 用于组织一组相关单元格，并统一处理移动端视觉、Design Tokens 与禁用交互规则。

## 基础用法

`title` 展示左侧标题，`value` 展示右侧内容，`label` 展示标题下方的补充说明。三者均支持字符串或数字。

```vue
<KyCellGroup>
  <KyCell title="单元格" value="内容" />
  <KyCell title="单元格" value="内容" label="描述信息" />
</KyCellGroup>
```

## 卡片分组

开启 `inset` 后，CellGroup 会以带圆角和页边距的卡片形式展示。分组标题可通过 `title` 属性或同名插槽提供。

```vue
<KyCellGroup title="账户设置" inset>
  <KyCell title="个人资料" is-link />
  <KyCell title="隐私设置" is-link />
</KyCellGroup>
```

## 图标与箭头

`icon` 在标题左侧展示 KyIcon 图标。`is-link` 展示右侧箭头，并在未显式设置 `clickable` 时自动开启点击反馈；`arrow-direction` 可切换箭头方向。

```vue
<KyCell title="通知设置" icon="bell" value="已开启" is-link arrow-direction="down" />
```

应用内跳转由业务在 `click` 事件中处理，组件不直接依赖路由库，也不内置路由参数。

## 尺寸与对齐

- `size="large"` 会增加单元格高度，并提升标题、描述和值的字号。
- `center` 适合左右内容高度不一致时使用，可让图标、标题和值垂直居中。
- 长标题、描述和值会在可用宽度内换行，避免挤压箭头和额外内容。

## 禁用状态

`disabled` 会应用禁用视觉，并阻止 `click` 事件。对于可点击单元格，组件使用原生 `button` 语义，支持键盘焦点和禁用状态。

## API

### Cell Props

| 参数            | 说明                                               | 类型                                  | 默认值     |
| --------------- | -------------------------------------------------- | ------------------------------------- | ---------- |
| title           | 左侧标题                                           | `string \| number`                    | `''`       |
| value           | 右侧内容                                           | `string \| number`                    | `''`       |
| label           | 标题下方的描述信息                                 | `string \| number`                    | `''`       |
| icon            | 左侧 KyIcon 图标名称                               | `string`                              | `''`       |
| size            | 单元格尺寸                                         | `'normal' \| 'large'`                 | `'normal'` |
| border          | 是否显示内分割线；分组中的最后一项自动隐藏         | `boolean`                             | `true`     |
| center          | 是否使左右内容垂直居中                             | `boolean`                             | `false`    |
| clickable       | 是否开启点击语义和按压反馈；`null` 时跟随 `isLink` | `boolean \| null`                     | `null`     |
| is-link         | 是否展示右侧箭头                                   | `boolean`                             | `false`    |
| arrow-direction | 右侧箭头方向                                       | `'right' \| 'down' \| 'up' \| 'left'` | `'right'`  |
| required        | 是否在标题前展示必填星号                           | `boolean`                             | `false`    |
| disabled        | 是否禁用单元格并阻止点击事件                       | `boolean`                             | `false`    |

### CellGroup Props

| 参数   | 说明                             | 类型      | 默认值  |
| ------ | -------------------------------- | --------- | ------- |
| title  | 分组标题                         | `string`  | `''`    |
| inset  | 是否展示为圆角卡片               | `boolean` | `false` |
| border | 非卡片模式下是否展示分组上下边框 | `boolean` | `true`  |

## 事件

| 事件名 | 说明                     | 回调参数            |
| ------ | ------------------------ | ------------------- |
| click  | 点击未禁用的单元格时触发 | `event: MouseEvent` |

## 插槽

### Cell Slots

| 名称       | 说明                                    |
| ---------- | --------------------------------------- |
| default    | 自定义右侧内容，作为 `value` 插槽的简写 |
| title      | 自定义左侧标题                          |
| value      | 自定义右侧内容                          |
| label      | 自定义标题下方的描述信息                |
| icon       | 自定义左侧图标                          |
| right-icon | 自定义右侧图标；提供后会替代默认箭头    |
| extra      | 自定义最右侧的额外内容，位于箭头之后    |

### CellGroup Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 单元格列表     |
| title   | 自定义分组标题 |

## 类型导出

```ts
import type {
  CellArrowDirection,
  CellContent,
  CellGroupProps,
  CellProps,
  CellSize,
} from '@kylin-design/vue-ui';
```
