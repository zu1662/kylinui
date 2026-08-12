# Tabs 标签页

用于在同一层级的内容分区之间切换，支持线型、卡片型、徽标、禁用和延迟渲染。

## 基础用法

```vue
<KyTabs v-model="active">
  <KyTab name="all" title="全部">全部内容</KyTab>
  <KyTab name="pending" title="待处理">待处理内容</KyTab>
</KyTabs>
```

## Tabs Props

| 属性       | 类型      | 默认值  | 说明                   |
| ---------- | --------- | ------- | ---------------------- |
| modelValue | `string   | number` | 首个可用项             | 当前标签                          |
| type       | `'line'   | 'card'` | `'line'`               | 导航样式                          |
| animated   | `boolean` | `false` | 是否启用内容切换动画   |
| ellipsis   | `boolean` | `true`  | 标题是否省略           |
| shrink     | `boolean` | `false` | 标签是否按内容宽度排列 |
| sticky     | `boolean` | `false` | 导航是否粘性定位       |
| offsetTop  | `number   | string` | `0`                    | 粘性导航顶部距离，数字单位为 `px` |
| duration   | `number`  | `220`   | 动画时长，单位为 `ms`  |

## Tab Props

| 属性       | 类型      | 默认值  | 说明         |
| ---------- | --------- | ------- | ------------ |
| name       | `string   | number` | 当前索引     | 标签标识 |
| title      | `string`  | -       | 标题         |
| disabled   | `boolean` | `false` | 是否禁用     |
| badge      | `string   | number` | -            | 徽标内容 |
| dot        | `boolean` | `false` | 是否显示圆点 |
| lazyRender | `boolean` | `true`  | 是否延迟渲染 |

支持 `update:modelValue`、`change` 和 `clickTab` 事件。标签列表支持方向键、Home 和 End 键切换。
