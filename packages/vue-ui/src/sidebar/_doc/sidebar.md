# Sidebar 侧边导航

用于分类、频道等纵向导航场景，由 `KySidebar` 和 `KySidebarItem` 组合使用。支持活动项滚动可见、禁用跳过、图标状态、徽标、标准链接和上下安全区。

## 基础用法

```vue
<KySidebar v-model="active">
  <KySidebarItem name="all" title="全部" />
  <KySidebarItem name="message" title="消息" :badge="8" />
  <KySidebarItem name="disabled" title="暂不可用" disabled />
</KySidebar>
```

## 链接项

```vue
<KySidebarItem
  name="help"
  title="帮助"
  href="/help"
  target="_self"
  active-icon="question-fill"
  inactive-icon="question"
/>
```

组件不绑定具体路由库；消费方可以使用 `href`，也可以在 `click` 或 `change` 中完成导航。

## API

### Sidebar Props

| 属性                | 类型      | 默认值       | 说明                         |
| ------------------- | --------- | ------------ | ---------------------------- |
| modelValue          | `string   | number`      | -                            | 当前激活项名称 |
| safeAreaInsetTop    | `boolean` | `false`      | 是否补充顶部安全区           |
| safeAreaInsetBottom | `boolean` | `false`      | 是否补充底部安全区           |
| scrollToActive      | `boolean` | `true`       | 激活变化后是否滚动到可见区域 |
| ariaLabel           | `string`  | `'侧边导航'` | 导航区域标签                 |

### SidebarItem Props

| 属性         | 类型      | 默认值  | 说明             |
| ------------ | --------- | ------- | ---------------- |
| name         | `string   | number` | 自动分配         | 项名称   |
| title        | `string`  | `''`    | 展示文案         |
| disabled     | `boolean` | `false` | 是否禁用         |
| badge        | `string   | number` | -                | 徽标内容 |
| dot          | `boolean` | `false` | 是否展示圆点徽标 |
| icon         | `string`  | `''`    | 通用图标         |
| activeIcon   | `string`  | `''`    | 激活图标         |
| inactiveIcon | `string`  | `''`    | 非激活图标       |
| href         | `string`  | `''`    | 原生链接地址     |
| target       | `string`  | -       | 原生链接目标     |
| rel          | `string`  | -       | 原生链接关系     |

### Sidebar 事件

| 事件名            | 参数          | 说明             |
| ----------------- | ------------- | ---------------- |
| update:modelValue | `name: string | number`          | 激活项变化 |
| change            | `name, index` | 选择可用项后触发 |

### SidebarItem 事件

| 事件名 | 参数                      | 说明             |
| ------ | ------------------------- | ---------------- |
| click  | `name, event: MouseEvent` | 点击可用项时触发 |

### 插槽

| 组件        | 名称    | 参数                               | 说明             |
| ----------- | ------- | ---------------------------------- | ---------------- |
| Sidebar     | default | -                                  | SidebarItem 列表 |
| SidebarItem | default | -                                  | 项文案           |
| SidebarItem | icon    | `{ active, itemName }`             | 自定义图标       |
| SidebarItem | badge   | `{ active, itemName, badge, dot }` | 自定义徽标       |
