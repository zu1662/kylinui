# Pagination 分页

用于在数据量较大时按页切换内容，支持页码模式、简洁模式和自定义前后按钮内容。

## 基础用法

```vue
<KyPagination v-model="page" :total-items="120" :items-per-page="10" force-ellipses />
```

## Props

| 属性          | 类型                  | 默认值     | 说明                                     |
| ------------- | --------------------- | ---------- | ---------------------------------------- |
| modelValue    | `number`              | `1`        | 当前页码                                 |
| totalItems    | `number`              | `0`        | 数据总数                                 |
| itemsPerPage  | `number`              | `10`       | 每页数据量                               |
| pageCount     | `number`              | `0`        | 总页数；大于 0 时优先于数据总数计算结果  |
| showPageSize  | `number`              | `5`        | 滑动窗口内展示的页码数量，最小为 3       |
| mode          | `'multi' \| 'simple'` | `'multi'`  | 展示模式                                 |
| forceEllipses | `boolean`             | `false`    | 是否固定展示首尾页，并在必要时显示省略号 |
| prevText      | `string`              | `'上一页'` | 上一页文字                               |
| nextText      | `string`              | `'下一页'` | 下一页文字                               |
| disabled      | `boolean`             | `false`    | 是否禁用                                 |

未开启 `forceEllipses` 时，组件只展示当前页附近的滑动页码窗口。

## 事件

- `update:modelValue`：页码更新时触发。
- `change`：用户切换页码时触发。

## 插槽

提供 `prev` 和 `next` 插槽，用于定制前后翻页按钮内容。
