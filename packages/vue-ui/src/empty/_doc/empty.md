# Empty 空状态

用于列表、搜索结果或暂无内容等状态，提供图形、标题、描述和操作区。网络错误、权限错误及其他业务错误优先通过 Empty 的图形与插槽组合表达。

## 基础用法

```vue
<KyEmpty title="暂无收藏" description="收藏的内容会显示在这里" />
```

## 操作区

```vue
<KyEmpty image="network" title="网络连接失败" description="请检查网络后重试">
  <template #action>
    <KyButton size="small">重新加载</KyButton>
  </template>
</KyEmpty>
```

默认插槽继续作为 `action` 的兼容回退；新代码推荐使用具名 `action` 插槽，明确操作区语义。

## API

### Props

| 属性        | 类型                                            | 默认值                | 说明                                   |
| ----------- | ----------------------------------------------- | --------------------- | -------------------------------------- |
| image       | `'default' \| 'search' \| 'network' \| 'error'` | `'default'`           | 内置空状态图形                         |
| imageSize   | `number \| string`                              | `112`                 | 图形尺寸，数字单位为 `px`              |
| title       | `string`                                        | `''`                  | 空状态标题                             |
| description | `string`                                        | ConfigProvider locale | 空状态描述；显式空字符串可隐藏默认描述 |

### 插槽

| 名称        | 说明                              |
| ----------- | --------------------------------- |
| image       | 自定义空状态图形                  |
| title       | 自定义标题内容                    |
| description | 自定义描述内容                    |
| action      | 标题和描述下方的主要操作区        |
| default     | `action` 插槽未提供时的兼容操作区 |

当前不新增 Result 或 ErrorBlock。网络、权限、请求失败等形态应先复用 `image`、`title`、`description` 和 `action` 组合，待跨业务的结构与行为稳定后再评估是否抽象独立组件。
