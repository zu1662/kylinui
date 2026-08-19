# Uploader 文件上传

Uploader 用于从移动设备选择图片或普通文件，并展示本地预览、上传进度、完成或失败状态。组件通过 `v-model` 管理文件列表；传入 `request` 时可直接执行上传，不传时可在 `afterRead` 事件中接入已有上传流程。

组件只负责文件选择、状态编排和请求调用，不预设服务端地址、鉴权头或表单字段结构。业务可在 `request` 中使用 `fetch`、`XMLHttpRequest` 或已有请求客户端，并通过 `signal` 取消请求、通过 `onProgress` 回传进度。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { KyUploader, type UploaderFile, type UploaderRequestOptions } from '@kylinui/vue';

const files = ref<UploaderFile[]>([]);

async function uploadFile({ file, signal, onProgress }: UploaderRequestOptions) {
  const body = new FormData();
  body.append('file', file);
  onProgress(10);
  const response = await fetch('/api/files', { method: 'POST', body, signal });
  if (!response.ok) throw new Error('上传失败');
  onProgress(100);
  return response.json();
}
</script>

<template>
  <KyUploader v-model="files" multiple :max-count="4" :request="uploadFile" />
</template>
```

当 `request` 的返回对象包含字符串 `url` 字段时，组件会用该地址替换本地临时预览地址。若后端响应结构不同，可在 `request` 中转换后再返回。

## 手动上传

关闭 `auto-upload` 后，选择文件只会进入 `ready` 状态，可通过组件实例启动全部待上传文件或指定文件。

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { KyUploader, type UploaderExpose, type UploaderFile } from '@kylinui/vue';

const uploader = ref<UploaderExpose>();
const files = ref<UploaderFile[]>([]);
</script>

<template>
  <KyUploader ref="uploader" v-model="files" :auto-upload="false" :request="uploadFile" />
  <button type="button" @click="uploader?.upload()">开始上传</button>
</template>
```

## 文件筛选与读取

`accept`、`max-count` 和 `max-size` 会在文件加入列表前执行。`before-read` 可异步拒绝文件或返回新的 `File`，适合压缩图片、修正文件名或执行额外校验。

`result-type="file"` 只保留原始 `File`，图片预览使用组件管理的临时对象地址；`dataUrl` 和 `text` 会额外把读取结果写入 `content`。组件会在文件移除、远端地址替换或实例卸载时回收自身创建的对象地址。

## API

### Props

| 属性           | 说明                                                 | 类型                                                       | 默认值           |
| -------------- | ---------------------------------------------------- | ---------------------------------------------------------- | ---------------- |
| modelValue     | 文件列表，支持 `v-model`                             | `UploaderFile[]`                                           | `[]`             |
| name           | 原生文件输入名称，同时写入事件的 `detail.name`       | `string`                                                   | `'file'`         |
| accept         | 允许选择的 MIME 类型或扩展名，多个规则用逗号分隔     | `string`                                                   | `'image/*'`      |
| capture        | 移动设备拍摄来源                                     | `boolean \| 'user' \| 'environment'`                       | `undefined`      |
| multiple       | 是否允许一次选择多个文件                             | `boolean`                                                  | `false`          |
| disabled       | 是否禁用选择、预览、删除和上传操作                   | `boolean`                                                  | `false`          |
| readonly       | 是否隐藏选择和删除入口，同时保留图片预览             | `boolean`                                                  | `false`          |
| maxCount       | 文件列表最大数量                                     | `number`                                                   | `Infinity`       |
| maxSize        | 单个文件最大字节数；函数返回 `true` 表示超限         | `number \| ((file: File) => boolean)`                      | `Infinity`       |
| resultType     | 文件读取结果；`file` 不额外读取内容                  | `'file' \| 'dataUrl' \| 'text'`                            | `'file'`         |
| listType       | 文件列表布局                                         | `'picture-card' \| 'list'`                                 | `'picture-card'` |
| imageFit       | 图片在预览区域内的填充方式                           | `ImageFit`                                                 | `'cover'`        |
| previewSize    | 卡片预览宽高；数组依次表示宽和高                     | `number \| string \| [number \| string, number \| string]` | `88`             |
| previewImage   | 点击图片时是否打开全屏预览                           | `boolean`                                                  | `true`           |
| previewOptions | 图片预览配置，不包含可见状态、图片列表和起始位置     | `UploaderPreviewOptions`                                   | `{}`             |
| showUpload     | 是否显示文件选择入口                                 | `boolean`                                                  | `true`           |
| showFileName   | 卡片布局是否在底部显示文件名；列表布局始终显示文件名 | `boolean`                                                  | `false`          |
| deletable      | 是否显示删除入口                                     | `boolean`                                                  | `true`           |
| autoUpload     | 传入 `request` 后是否在文件读取完成时立即上传        | `boolean`                                                  | `true`           |
| uploadText     | 默认选择入口文案                                     | `string`                                                   | `''`             |
| uploadIcon     | 默认选择入口图标名称                                 | `string`                                                   | `'camera'`       |
| beforeRead     | 文件加入列表前的同步或异步拦截器                     | `UploaderBeforeRead`                                       | `undefined`      |
| beforeDelete   | 文件删除前的同步或异步拦截器，返回 `false` 阻止删除  | `UploaderBeforeDelete`                                     | `undefined`      |
| request        | 上传请求函数；不传时由业务在 `afterRead` 中处理      | `UploaderRequest`                                          | `undefined`      |

### UploaderFile

| 字段      | 说明                                                   | 类型                                           |
| --------- | ------------------------------------------------------ | ---------------------------------------------- |
| uid       | 文件稳定标识；新增文件会自动生成                       | `string`                                       |
| name      | 文件名                                                 | `string`                                       |
| url       | 预览或远端文件地址                                     | `string`                                       |
| thumbUrl  | 缩略图地址，存在时优先于 `url`                         | `string`                                       |
| file      | 原始浏览器文件                                         | `File`                                         |
| type      | MIME 类型                                              | `string`                                       |
| size      | 文件体积，单位为字节                                   | `number`                                       |
| content   | `dataUrl` 或 `text` 读取结果                           | `string`                                       |
| status    | 上传状态                                               | `'ready' \| 'uploading' \| 'done' \| 'failed'` |
| message   | 状态补充或错误信息                                     | `string`                                       |
| percent   | 上传进度，组件会约束到 `0` 至 `100`                    | `number`                                       |
| response  | `request` 返回的原始结果                               | `unknown`                                      |
| isImage   | 是否按图片展示；未提供时根据 MIME 类型、名称或地址推断 | `boolean`                                      |
| deletable | 是否允许删除当前文件；`false` 可覆盖组件级删除能力     | `boolean`                                      |

### UploaderRequestOptions

| 字段       | 说明                                        | 类型                        |
| ---------- | ------------------------------------------- | --------------------------- |
| file       | 当前原始文件                                | `File`                      |
| item       | 当前文件列表项快照                          | `UploaderFile`              |
| fileList   | 请求开始时的完整列表快照                    | `UploaderFile[]`            |
| signal     | 删除文件、重试或卸载组件时触发取消的信号    | `AbortSignal`               |
| onProgress | 更新上传进度；传入值会被约束到 `0` 至 `100` | `(percent: number) => void` |

## 事件

| 事件名            | 触发条件                                 | 载荷                                                    |
| ----------------- | ---------------------------------------- | ------------------------------------------------------- |
| update:modelValue | 文件列表变化                             | `files: UploaderFile[]`                                 |
| change            | 选择、删除、上传状态或清空导致列表变化   | `payload: UploaderChangePayload`                        |
| select            | 一次文件选择完成，包括接受和拒绝结果     | `payload: UploaderSelectPayload`                        |
| afterRead         | 文件校验并读取完成，且已加入列表         | `files: UploaderFile[], detail: UploaderDetail`         |
| reject            | 文件因类型、数量、体积、读取或拦截被拒绝 | `files: UploaderRejectedFile[], detail: UploaderDetail` |
| oversize          | 文件超过 `maxSize`                       | `files: File[], detail: UploaderDetail`                 |
| clickUpload       | 点击原生文件选择入口                     | -                                                       |
| clickPreview      | 点击文件预览区域                         | `file: UploaderFile, detail: UploaderDetail`            |
| closePreview      | 关闭内置图片预览                         | `index: number`                                         |
| delete            | 文件删除完成                             | `file: UploaderFile, detail: UploaderDetail`            |
| uploadStart       | `request` 开始执行                       | `file: UploaderFile`                                    |
| uploadProgress    | `request` 调用 `onProgress`              | `payload: UploaderProgressPayload`                      |
| uploadSuccess     | `request` 成功完成                       | `file: UploaderFile, response: unknown`                 |
| uploadError       | `request` 抛出或拒绝                     | `file: UploaderFile, error: unknown`                    |

`UploaderRejectedFile.reason` 可能是 `accept`、`max-count`、`max-size`、`before-read` 或 `read-error`。`UploaderChangePayload.source` 可能是 `select`、`remove`、`upload`、`retry` 或 `clear`。

## 插槽

| 名称          | 用途                       | 插槽参数                                    |
| ------------- | -------------------------- | ------------------------------------------- |
| upload        | 自定义文件选择入口视觉内容 | `disabled: boolean, chooseFile: () => void` |
| preview       | 自定义单个文件预览内容     | `file: UploaderFile, index: number`         |
| preview-cover | 在预览内容底部增加覆盖层   | `file: UploaderFile, index: number`         |

## 实例方法

| 方法       | 说明                                                         | 类型                                                 |
| ---------- | ------------------------------------------------------------ | ---------------------------------------------------- |
| chooseFile | 打开原生文件选择器                                           | `() => void`                                         |
| upload     | 上传全部 `ready`/`failed` 文件，或按文件对象、`uid` 上传一个 | `(target?: UploaderFile \| string) => Promise<void>` |
| remove     | 按文件对象或 `uid` 删除一个文件，并执行 `beforeDelete`       | `(target: UploaderFile \| string) => Promise<void>`  |
| clear      | 依次删除全部允许删除的文件                                   | `() => Promise<void>`                                |

## 行为说明

- `accept` 是选择提示，组件仍会在文件加入列表前再次校验 MIME 类型和扩展名。
- 达到 `maxCount` 后选择入口自动隐藏；超出的文件通过 `reject` 事件返回。
- 上传中的文件被删除、同一文件重新上传或组件卸载时，当前 `AbortSignal` 会触发取消。
- `readonly` 保留图片预览；`disabled` 阻止选择、预览、删除和上传。
- 普通文件不会进入图片预览，但仍会触发 `clickPreview`，便于业务实现下载或详情查看。
