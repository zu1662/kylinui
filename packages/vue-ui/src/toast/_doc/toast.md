# Toast 轻提示

Toast 用于在页面中短暂展示消息通知、加载状态和操作结果。默认在视口中央显示，既可以通过服务函数快速调用，也可以使用 `KyToast` 组件承载自定义内容。

## 使用建议

- 普通提示应保持简短，并在完成阅读后自动消失。
- 加载提示默认不会自动关闭，异步任务结束后应主动调用实例的 `close` 或 `closeToast`。
- `forbidClick` 适合避免重复提交，但不能替代按钮自身的 loading 与 disabled 状态。
- 表单错误等需要持续可见的信息，应同时在对应页面区域展示原因。

## 引入

```ts
import {
  KyToast,
  showToast,
  showLoadingToast,
  showSuccessToast,
  showFailToast,
} from '@kylinui/vue';
```

## 基础用法

```ts
showToast('提示内容');

showLoadingToast({
  message: '加载中...',
  forbidClick: true,
});

showSuccessToast('保存成功');
showFailToast('保存失败');
```

## API

### KyToast Props

| 属性         | 类型                                    | 默认值    | 说明                                      |
| ------------ | --------------------------------------- | --------- | ----------------------------------------- |
| show         | boolean                                 | false     | 是否显示，支持 `v-model:show`             |
| message      | string / number                         | -         | 提示内容                                  |
| type         | text / success / error / fail / loading | text      | 提示类型；`fail` 是 `error` 的兼容别名    |
| icon         | string                                  | -         | 自定义图标名、图片地址或 Data URL         |
| iconSize     | number / string                         | 28        | 图标尺寸                                  |
| loadingType  | circular / spinner                      | circular  | 加载图标类型                              |
| duration     | number                                  | 2000      | 自动关闭时间，单位毫秒；0 表示不自动关闭  |
| position     | top / center / middle / bottom          | center    | 显示位置；`middle` 是 `center` 的兼容别名 |
| wordBreak    | break-all / break-word / normal         | break-all | 长文本换行方式                            |
| zIndex       | number / string                         | 1000      | 层级                                      |
| forbidClick  | boolean                                 | false     | 是否拦截背景点击                          |
| overlay      | boolean                                 | false     | 是否显示遮罩                              |
| closeOnClick | boolean                                 | false     | 点击 Toast 时是否关闭                     |
| teleport     | string / Element                        | body      | 传送目标                                  |
| className    | string                                  | -         | Toast 内容根节点的附加类名                |

### ToastOptions

服务函数接收字符串、数字或 `ToastOptions`。`ToastOptions` 包含除 `show` 外的全部 Props，并额外支持以下回调：

| 属性     | 类型     | 说明               |
| -------- | -------- | ------------------ |
| onOpened | function | 进入动画完成后触发 |
| onClose  | function | 关闭开始时触发     |

## 事件

| 事件名      | 触发条件               | 参数                |
| ----------- | ---------------------- | ------------------- |
| update:show | 组件请求更新显示状态时 | `value: boolean`    |
| opened      | 进入动画完成后         | -                   |
| closed      | 离开动画完成后         | -                   |
| click       | 点击 Toast 内容时      | `event: MouseEvent` |

## 插槽

| 插槽名  | 用途           |
| ------- | -------------- |
| message | 自定义提示内容 |
| icon    | 自定义图标区域 |

## 服务函数

| 方法名                   | 说明                               | 参数                             | 返回值          |
| ------------------------ | ---------------------------------- | -------------------------------- | --------------- |
| showToast                | 展示文字或自定义提示               | `ToastOptions / string / number` | `ToastInstance` |
| showLoadingToast         | 展示加载提示，默认持续显示         | `ToastOptions / string / number` | `ToastInstance` |
| showSuccessToast         | 展示成功提示                       | `ToastOptions / string / number` | `ToastInstance` |
| showFailToast            | 展示失败提示                       | `ToastOptions / string / number` | `ToastInstance` |
| closeToast               | 关闭当前提示；传入 true 时关闭全部 | `all?: boolean`                  | void            |
| allowMultipleToast       | 是否允许同时展示多个实例           | `value?: boolean`                | void            |
| setToastDefaultOptions   | 设置全部或指定类型的默认配置       | `options` 或 `type, options`     | void            |
| resetToastDefaultOptions | 重置全部或指定类型的默认配置       | `type?`                          | void            |

`ToastInstance` 提供 `close()`，并允许直接读写 `message` 实现动态更新。

## 兼容接口

- `showLoading` 等同于 `showLoadingToast`。
- `hideToast` 等同于 `closeToast`。
- `useToast()` 返回 `show`、`loading`、`success`、`fail`、`close` 和 `hide`。
- `toastState` 保留给旧代码读取；开启多实例后，它反映最后打开且仍可见的 Toast。
