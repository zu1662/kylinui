# List 列表加载

用于连续加载长列表。组件会在哨兵接近滚动容器边界时触发 `load`，并统一管理加载、错误与完成状态的展示。

## 基础用法

```vue
<KyList
  v-model:loading="loading"
  v-model:error="error"
  :finished="finished"
  finished-text="没有更多内容了"
  @load="loadMore"
>
  <div v-for="item in items" :key="item">{{ item }}</div>
</KyList>
```

处理 `load` 时应保持 `loading` 为 `true`，数据更新完成后再设为 `false`。列表会重新检查剩余空间，内容仍未填满容器时可能继续触发下一轮加载。

## 向上加载

设置 `direction="up"` 后，哨兵和状态区位于内容顶部，适合历史消息等向上追加的场景。业务侧在前插数据时可自行保存并恢复滚动位置，避免可视内容跳动。

## 错误重试

请求失败时将 `error` 设为 `true`。用户点击错误提示后，组件先触发 `update:error(false)`，再检查边界并重新触发加载。

## Props

| 属性           | 类型             | 默认值               | 说明                                 |
| -------------- | ---------------- | -------------------- | ------------------------------------ |
| loading        | `boolean`        | `false`              | 是否正在加载，支持 `v-model:loading` |
| finished       | `boolean`        | `false`              | 是否已加载全部内容                   |
| error          | `boolean`        | `false`              | 是否加载失败，支持 `v-model:error`   |
| loadingText    | `string`         | `加载中…`            | 加载状态文案                         |
| finishedText   | `string`         | `''`                 | 完成状态文案                         |
| errorText      | `string`         | `加载失败，点击重试` | 错误状态文案                         |
| immediateCheck | `boolean`        | `true`               | 挂载后是否立即检查边界               |
| offset         | `number`         | `100`                | 距离边界多少像素时预加载             |
| direction      | `'down' \| 'up'` | `'down'`             | 加载方向                             |
| disabled       | `boolean`        | `false`              | 是否暂停边界检查与重试               |

## 事件

| 事件名         | 参数      | 说明                     |
| -------------- | --------- | ------------------------ |
| load           | -         | 需要加载下一批数据时触发 |
| update:loading | `boolean` | 触发加载时更新为 `true`  |
| update:error   | `boolean` | 点击重试时更新为 `false` |

## 插槽

| 名称     | 说明           |
| -------- | -------------- |
| default  | 列表内容       |
| loading  | 自定义加载状态 |
| finished | 自定义完成状态 |
| error    | 自定义错误状态 |

## 注意事项

- `loading`、`finished`、`error`、`disabled` 任一状态阻止加载时，组件不会重复触发 `load`。
- 组件自动识别最近的纵向滚动容器；没有滚动容器时以视口作为边界。
- 自定义 `error` 插槽时，重试行为由插槽内容自行触发；需要重试入口时可改用默认错误状态。
