# Collapse 折叠面板

用于分组收纳较长的补充说明，支持多项展开与手风琴模式。

## 基础用法

```vue
<KyCollapse v-model="active">
  <KyCollapseItem name="intro" title="说明">内容</KyCollapseItem>
</KyCollapse>
```

## Collapse Props

| 属性       | 类型      | 默认值  | 说明               |
| ---------- | --------- | ------- | ------------------ |
| modelValue | `string   | number  | Array<string       | number> | null` | `[]` | 当前展开项 |
| accordion  | `boolean` | `false` | 是否只允许展开一项 |
| border     | `boolean` | `true`  | 是否显示外边框     |

## CollapseItem Props

| 属性     | 类型      | 默认值  | 说明           |
| -------- | --------- | ------- | -------------- |
| name     | `string   | number` | 注册顺序编号   | 唯一标识。未命名项在注册时分配稳定的编号，前置项删除或插入不会改变已有编号 |
| title    | `string`  | -       | 标题           |
| value    | `string`  | -       | 右侧辅助信息   |
| icon     | `string`  | -       | 左侧图标       |
| disabled | `boolean` | `false` | 是否禁用       |
| readonly | `boolean` | `false` | 是否只读       |
| border   | `boolean` | `true`  | 是否显示分割线 |

## 事件

`update:modelValue` 和 `change` 在展开状态变化时触发。
