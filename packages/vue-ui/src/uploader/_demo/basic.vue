<template>
  <div class="uploader-demo">
    <section>
      <h3>图片自动上传</h3>
      <p>支持多选、体积限制、进度展示和全屏预览。</p>
      <KyUploader
        v-model="imageFiles"
        multiple
        :max-count="4"
        :max-size="2 * 1024 * 1024"
        upload-text="上传图片"
        :request="simulateRequest"
        @oversize="notice = '单个文件不能超过 2 MB'"
        @upload-success="notice = $event.name + ' 上传完成'"
      />
      <span class="uploader-demo__notice">{{ notice }}</span>
    </section>

    <section>
      <h3>文件列表</h3>
      <p>普通文件使用列表布局展示名称、体积和上传状态。</p>
      <KyUploader
        v-model="documentFiles"
        accept="image/*,.pdf,.doc,.docx"
        list-type="list"
        multiple
        :max-count="5"
        upload-text="添加附件"
        :request="simulateRequest"
      />
    </section>

    <section>
      <h3>手动上传与自定义入口</h3>
      <KyUploader
        ref="manualUploader"
        v-model="manualFiles"
        :auto-upload="false"
        multiple
        :request="simulateRequest"
      >
        <template #upload>
          <span class="uploader-demo__custom-trigger">
            <KyIcon name="plus" :size="22" />
            选择凭证
          </span>
        </template>
      </KyUploader>
      <KyButton
        type="primary"
        size="small"
        :disabled="!manualFiles.some((file) => file.status === 'ready')"
        @click="manualUploader?.upload()"
      >
        开始上传
      </KyButton>
    </section>

    <section>
      <h3>状态展示</h3>
      <KyUploader v-model="statusFiles" :show-upload="false" show-file-name />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KyButton from '../../button';
import KyIcon from '../../icon';
import type { UploaderExpose, UploaderFile, UploaderRequestOptions } from '../index';
import KyUploader from '../index';

const imageSource =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240"><rect width="320" height="240" fill="#e7f4ee"/><circle cx="250" cy="58" r="28" fill="#ffd27d"/><path d="M0 210L92 98l70 72 48-54 110 110v14H0z" fill="#7fc8a9"/></svg>',
  );
const imageFiles = ref<UploaderFile[]>([
  {
    uid: 'image-done',
    name: '山谷插画.svg',
    url: imageSource,
    type: 'image/svg+xml',
    status: 'done',
  },
]);
const documentFiles = ref<UploaderFile[]>([
  { uid: 'document', name: '行程说明.pdf', type: 'application/pdf', size: 328704, status: 'done' },
]);
const manualFiles = ref<UploaderFile[]>([]);
const statusFiles = ref<UploaderFile[]>([
  {
    uid: 'uploading',
    name: '正在上传.svg',
    url: imageSource,
    type: 'image/svg+xml',
    status: 'uploading',
    percent: 68,
  },
  {
    uid: 'failed',
    name: '上传失败.svg',
    url: imageSource,
    type: 'image/svg+xml',
    status: 'failed',
    message: '网络异常',
  },
]);
const manualUploader = ref<UploaderExpose | null>(null);
const notice = ref('请选择图片');

function simulateRequest({ onProgress, signal }: UploaderRequestOptions) {
  return new Promise<{ ok: true }>((resolve, reject) => {
    let percent = 0;
    const timer = window.setInterval(() => {
      percent += 10;
      onProgress(percent);
      if (percent < 100) return;
      window.clearInterval(timer);
      resolve({ ok: true });
    }, 100);
    signal.addEventListener(
      'abort',
      () => {
        window.clearInterval(timer);
        reject(new DOMException('上传已取消', 'AbortError'));
      },
      { once: true },
    );
  });
}
</script>

<style scoped>
.uploader-demo {
  display: grid;
  gap: var(--ky-space-5);
  padding: var(--ky-space-4);
  background: var(--ky-color-page-bg);
}

.uploader-demo section {
  display: grid;
  gap: var(--ky-space-3);
  padding: var(--ky-space-4);
  background: var(--ky-color-surface);
  border-radius: var(--ky-radius-lg);
}

.uploader-demo h3,
.uploader-demo p {
  margin: 0;
}

.uploader-demo p,
.uploader-demo__notice {
  font-size: var(--ky-font-size-assist);
  color: var(--ky-color-text-secondary);
}

.uploader-demo__custom-trigger {
  display: flex;
  flex-direction: column;
  gap: var(--ky-space-1);
  align-items: center;
}
</style>
