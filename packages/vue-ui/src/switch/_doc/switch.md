# Switch 开关

Switch 用于切换立即生效的二元状态，支持异步切换守卫、加载反馈和自定义真假值。

## 使用建议

- 仅用于会立即生效的设置；需要提交确认时优先使用 Checkbox。
- 异步保存使用 `beforeChange`，组件会在 Promise 完成前锁定交互并展示加载反馈。
- 标签应描述开启后的状态或控制对象，避免只写“开关”。

## API

| 属性          | 类型                                     | 默认值     | 说明                        |
| ------------- | ---------------------------------------- | ---------- | --------------------------- |
| modelValue    | `SwitchValue`                            | `false`    | 当前值                      |
| label         | `string`                                 | 必填       | 开关标签                    |
| disabled      | `boolean`                                | `false`    | 是否禁用                    |
| loading       | `boolean`                                | `false`    | 是否显示加载并锁定交互      |
| size          | `'small' \| 'medium'`                    | `'medium'` | 开关尺寸                    |
| activeValue   | `SwitchValue`                            | `true`     | 开启时的值                  |
| inactiveValue | `SwitchValue`                            | `false`    | 关闭时的值                  |
| beforeChange  | `(value) => boolean \| Promise<boolean>` | -          | 切换前守卫，返回 false 取消 |

## 事件

| 事件名            | 说明                   | 回调参数             |
| ----------------- | ---------------------- | -------------------- |
| update:modelValue | 切换通过守卫后触发     | `value: SwitchValue` |
| change            | 用户切换成功时触发     | `value: SwitchValue` |
| changeError       | 异步守卫抛出错误时触发 | `error: unknown`     |

## 插槽

| 名称    | 说明               |
| ------- | ------------------ |
| default | 自定义开关标签内容 |
