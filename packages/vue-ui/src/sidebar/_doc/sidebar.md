# Sidebar 侧边导航

用于纵向展示同级导航入口。未设置导航项 `name` 时，组件使用注册时分配的稳定编号作为名称，前置项删除或插入不会改变已有编号。

## 基础用法

```vue
<KySidebar v-model="active">
  <KySidebarItem name="overview" title="概览" />
  <KySidebarItem name="messages" title="消息" badge="8" />
</KySidebar>
```

## Sidebar Props

| 属性       | 类型               | 默认值 | 说明                                     |
| ---------- | ------------------ | ------ | ---------------------------------------- |
| modelValue | `string \| number` | -      | 当前激活项名称；未传入时组件维护内部状态 |

## SidebarItem Props

| 属性     | 类型               | 默认值       | 说明         |
| -------- | ------------------ | ------------ | ------------ |
| name     | `string \| number` | 注册顺序编号 | 导航项名称   |
| title    | `string`           | `''`         | 导航项标题   |
| disabled | `boolean`          | `false`      | 是否禁用     |
| badge    | `string \| number` | -            | 徽标内容     |
| dot      | `boolean`          | `false`      | 是否展示红点 |

## 事件

- `KySidebar` 的 `update:modelValue`：激活项更新时触发。
- `KySidebar` 的 `change`：激活项更新时触发，参数为名称和索引。
- `KySidebarItem` 的 `click`：可用导航项被点击时触发。

## 键盘操作

导航获得焦点后，可使用上下方向键循环切换，使用 `Home` 和 `End` 跳转到首尾可用项。
