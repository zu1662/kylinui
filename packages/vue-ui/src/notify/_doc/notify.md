# Notify 消息提示

Notify 用于在页面顶部或底部展示需要立即关注的状态消息。它不会阻断页面操作，适合成功结果、风险提醒、失败反馈和短时系统通知。

## 基础用法

```ts
import { showDangerNotify, showNotify, showSuccessNotify, showWarningNotify } from '@kylinui/vue';

showNotify('主要通知内容');
showSuccessNotify('操作已成功完成');
showWarningNotify('当前网络连接不稳定');
showDangerNotify('提交失败，请稍后重试');
```

## 常驻与关闭

将 `duration` 设为 `0` 可保持通知显示，配合 `closeable` 提供关闭按钮。

```ts
showNotify({
  message: '系统将在今晚 23:00 进行维护',
  type: 'warning',
  duration: 0,
  closeable: true,
});
```

## 组件用法

```vue
<KyNotify v-model:show="visible" type="warning" :duration="0">
  请先完成身份验证
  <template #action="{ close }">
    <button type="button" @click.stop="close">知道了</button>
  </template>
</KyNotify>
```

## API

### Notify Props

| 属性                | 类型                                 | 默认值       | 说明                                     |
| ------------------- | ------------------------------------ | ------------ | ---------------------------------------- |
| show                | boolean                              | false        | 是否显示，支持 `v-model:show`            |
| message             | string / number                      | -            | 消息内容                                 |
| type                | primary / success / warning / danger | primary      | 语义类型                                 |
| duration            | number                               | 3000         | 自动关闭时间，单位毫秒；0 表示不自动关闭 |
| position            | top / bottom                         | top          | 展示位置                                 |
| offset              | number / string                      | 0            | 距离页面边缘的偏移，数字单位为像素       |
| zIndex              | number / string                      | 1000         | 层级                                     |
| icon                | string                               | -            | 自定义图标名                             |
| showIcon            | boolean                              | true         | 是否显示语义图标                         |
| closeable           | boolean                              | false        | 是否显示关闭按钮                         |
| closeIcon           | string                               | close        | 关闭按钮图标名                           |
| closeOnClick        | boolean                              | false        | 点击通知主体时是否关闭                   |
| safeAreaInsetTop    | boolean                              | true         | 顶部展示时是否适配安全区                 |
| safeAreaInsetBottom | boolean                              | true         | 底部展示时是否适配安全区                 |
| teleport            | string / Element / false             | 统一浮层容器 | 传送目标；false 表示原地渲染             |
| className           | string                               | -            | 通知根节点的附加类名                     |

### NotifyOptions

服务函数接收字符串、数字或 `NotifyOptions`。`NotifyOptions` 包含除 `show` 外的全部 Props，并额外支持以下回调：

| 属性     | 类型     | 说明               |
| -------- | -------- | ------------------ |
| onOpened | function | 进入动画完成后触发 |
| onClose  | function | 关闭开始时触发     |

## 事件

| 事件名      | 触发条件               | 参数                |
| ----------- | ---------------------- | ------------------- |
| update:show | 组件请求更新显示状态时 | `value: boolean`    |
| opened      | 进入动画完成后         | -                   |
| close       | 自动关闭或主动关闭时   | -                   |
| closed      | 离开动画完成后         | -                   |
| click       | 点击通知主体时         | `event: MouseEvent` |

## 插槽

| 插槽名  | 用途                           | 参数        |
| ------- | ------------------------------ | ----------- |
| default | 自定义消息内容                 | -           |
| icon    | 自定义图标区域                 | -           |
| action  | 自定义尾部操作；可调用关闭方法 | `{ close }` |

## 服务函数

| 方法名                    | 说明                         | 参数                              | 返回值           |
| ------------------------- | ---------------------------- | --------------------------------- | ---------------- |
| showNotify                | 展示主要通知                 | `NotifyOptions / string / number` | `NotifyInstance` |
| showPrimaryNotify         | 展示主要通知                 | `NotifyOptions / string / number` | `NotifyInstance` |
| showSuccessNotify         | 展示成功通知                 | `NotifyOptions / string / number` | `NotifyInstance` |
| showWarningNotify         | 展示警告通知                 | `NotifyOptions / string / number` | `NotifyInstance` |
| showDangerNotify          | 展示危险通知                 | `NotifyOptions / string / number` | `NotifyInstance` |
| closeNotify               | 关闭当前通知                 | -                                 | void             |
| setNotifyDefaultOptions   | 设置全部或指定类型的默认配置 | `options` 或 `type, options`      | void             |
| resetNotifyDefaultOptions | 重置全部或指定类型的默认配置 | `type?`                           | void             |

`NotifyInstance` 提供 `close()`，并允许直接读写 `message` 动态更新内容。`useNotify()` 返回 `show`、`primary`、`success`、`warning`、`danger` 和 `close`。

## CSS 变量

| 变量名                         | 默认值                       | 说明           |
| ------------------------------ | ---------------------------- | -------------- |
| --ky-notify-min-height         | 44px                         | 最小高度       |
| --ky-notify-padding-y          | var(--ky-space-3)            | 垂直内边距     |
| --ky-notify-padding-x          | var(--ky-space-4)            | 水平内边距     |
| --ky-notify-primary-background | var(--ky-color-brand-strong) | 主要通知背景色 |
| --ky-notify-success-background | var(--ky-color-success)      | 成功通知背景色 |
| --ky-notify-warning-background | var(--ky-color-warning)      | 警告通知背景色 |
| --ky-notify-danger-background  | var(--ky-color-danger)       | 危险通知背景色 |
