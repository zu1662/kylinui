<template>
  <div class="uploader-usage">
    <KyUploader
      v-model="files"
      :accept="accept"
      :multiple="multiple"
      :max-count="maxCount"
      :list-type="listType"
      :preview-size="previewSize"
      :preview-image="previewImage"
      :show-file-name="showFileName"
      :deletable="deletable"
      :auto-upload="autoUpload"
      :disabled="disabled"
      :readonly="readonly"
      :upload-text="uploadText"
      :request="simulateRequest"
      @reject="message = rejectionMessage($event)"
      @upload-success="message = $event.name + ' 上传完成'"
    />
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { UploaderFile, UploaderRejectedFile, UploaderRequestOptions } from '../index';
import KyUploader from '../index';

const props = defineProps<{ configProps: Record<string, unknown> }>();
const source =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240"><rect width="320" height="240" fill="#e7f4ee"/><circle cx="250" cy="58" r="28" fill="#ffd27d"/><path d="M0 210L92 98l70 72 48-54 110 110v14H0z" fill="#7fc8a9"/></svg>',
  );
const files = ref<UploaderFile[]>([
  { uid: 'sample', name: '山谷插画.svg', url: source, type: 'image/svg+xml', status: 'done' },
]);
const message = ref('可选择本地文件体验上传流程');
const accept = computed(() => String(props.configProps.accept ?? 'image/*'));
const multiple = computed(() => Boolean(props.configProps.multiple ?? true));
const maxCount = computed(() => Number(props.configProps.maxCount ?? 4));
const listType = computed(() => (props.configProps.listType === 'list' ? 'list' : 'picture-card'));
const previewSize = computed(() => Number(props.configProps.previewSize ?? 88));
const previewImage = computed(() => Boolean(props.configProps.previewImage ?? true));
const showFileName = computed(() => Boolean(props.configProps.showFileName ?? false));
const deletable = computed(() => Boolean(props.configProps.deletable ?? true));
const autoUpload = computed(() => Boolean(props.configProps.autoUpload ?? true));
const disabled = computed(() => Boolean(props.configProps.disabled ?? false));
const readonly = computed(() => Boolean(props.configProps.readonly ?? false));
const uploadText = computed(() => String(props.configProps.uploadText ?? '上传文件'));

function simulateRequest({ onProgress, signal }: UploaderRequestOptions) {
  return new Promise<{ ok: true }>((resolve, reject) => {
    let percent = 0;
    const timer = window.setInterval(() => {
      percent += 20;
      onProgress(percent);
      if (percent < 100) return;
      window.clearInterval(timer);
      resolve({ ok: true });
    }, 120);
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

function rejectionMessage(rejected: UploaderRejectedFile[]) {
  const reason = rejected[0]?.reason;
  if (reason === 'max-count') return '文件数量已达到上限';
  if (reason === 'max-size') return '文件体积超过限制';
  if (reason === 'accept') return '文件类型不符合要求';
  return '文件未加入上传列表';
}
</script>

<style scoped>
.uploader-usage {
  display: grid;
  gap: var(--ky-space-3);
  padding: var(--ky-space-4);
}

.uploader-usage p {
  margin: 0;
  font-size: var(--ky-font-size-assist);
  color: var(--ky-color-text-secondary);
}
</style>
