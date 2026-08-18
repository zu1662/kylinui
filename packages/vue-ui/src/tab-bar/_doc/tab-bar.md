# TabBar 标签导航

用于移动端一级频道或页面入口切换，支持固定等分、横向滚动、活动项可见、图标状态、徽标插槽、标准链接和底部安全区。

TabBar 表达的是导航入口，不能代替承载内容面板、滑动内容和复杂标签语义的 Tabs。

## 基础用法

```vue
<KyTabBar v-model="active" :data="items" />
```

## 链接与图标状态

```ts
const items = [
  {
    label: '首页',
    value: 'home',
    href: '/home',
    activeIcon: 'home',
    inactiveIcon: 'home-line',
  },
  { label: '消息', value: 'message', badge: 8 },
  { label: '会员', value: 'member', disabled: true },
];
```

组件只提供 `href`、原生点击事件和插槽，不直接依赖具体路由库。禁用项不会激活、获得焦点或参与活动指示线定位。

## API

### Props

| 属性                | 类型           | 默认值       | 说明                                         |
| ------------------- | -------------- | ------------ | -------------------------------------------- |
| modelValue          | `string        | number`      | -                                            | 当前激活值       |
| current             | `string        | number`      | `0`                                          | 兼容的当前激活值 |
| data                | `TabBarItem[]` | -            | 标签数据                                     |
| fixedCount          | `number`       | `4`          | 非滚动模式下固定等分数量；超过时默认启用滚动 |
| scrollable          | `boolean`      | 自动判断     | 是否强制横向滚动                             |
| animated            | `boolean`      | `true`       | 是否启用指示线和滚动动画                     |
| safeAreaInsetBottom | `boolean`      | `false`      | 是否补充底部安全区                           |
| ariaLabel           | `string`       | `'标签导航'` | 导航区域标签                                 |

### TabBarItem

| 字段         | 类型      | 说明                       |
| ------------ | --------- | -------------------------- |
| label        | `string`  | 标签文案                   |
| title        | `string`  | 兼容文案字段，`label` 优先 |
| value        | `string   | number`                    | 标签值，未提供时使用索引 |
| badge        | `string   | number`                    | 徽标内容                 |
| disabled     | `boolean` | 是否禁用                   |
| icon         | `string`  | 通用图标                   |
| activeIcon   | `string`  | 激活图标，优先于 `icon`    |
| inactiveIcon | `string`  | 非激活图标，优先于 `icon`  |
| href         | `string`  | 原生链接地址               |
| target       | `string`  | 原生链接目标               |
| rel          | `string`  | 原生链接关系               |

### 事件

| 事件名            | 参数                             | 说明             |
| ----------------- | -------------------------------- | ---------------- |
| update:modelValue | `value: string                   | number`          | 激活值变化       |
| update:current    | `value: string                   | number`          | 兼容的激活值变化 |
| change            | `value, index, item`             | 选择可用项后触发 |
| click             | `item, index, event: MouseEvent` | 点击可用项时触发 |

### 插槽

| 名称  | 参数                             | 说明       |
| ----- | -------------------------------- | ---------- |
| icon  | `{ item, index, active }`        | 自定义图标 |
| badge | `{ item, index, active, badge }` | 自定义徽标 |
