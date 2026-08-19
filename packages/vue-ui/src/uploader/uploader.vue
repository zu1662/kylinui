<template>
  <div
    class="ky-uploader"
    :class="[`ky-uploader--${listType}`, { 'is-disabled': disabled, 'is-readonly': readonly }]"
    :style="uploaderStyle"
    :aria-disabled="disabled || undefined"
  >
    <div class="ky-uploader__list" role="list">
      <div
        v-for="(file, index) in files"
        :key="file.uid"
        class="ky-uploader__item"
        :class="[`ky-uploader__item--${file.status}`, { 'is-image': isImage(file) }]"
        role="listitem"
      >
        <button
          type="button"
          class="ky-uploader__preview"
          :disabled="disabled"
          :aria-label="previewLabel(file)"
          @click="handlePreview(file, index)"
        >
          <slot name="preview" :file="file" :index="index">
            <img
              v-if="isImage(file) && fileSource(file)"
              class="ky-uploader__image"
              :src="fileSource(file)"
              :alt="file.name || '上传图片'"
            />
            <span v-else class="ky-uploader__file-icon" aria-hidden="true">
              <KyIcon name="upload" source="iconfont" :size="28" />
            </span>
          </slot>
          <span v-if="showFileName && listType === 'picture-card'" class="ky-uploader__caption">
            {{ displayName(file) }}
          </span>
          <span v-if="$slots['preview-cover']" class="ky-uploader__preview-cover">
            <slot name="preview-cover" :file="file" :index="index" />
          </span>
        </button>

        <div v-if="listType === 'list'" class="ky-uploader__meta">
          <span class="ky-uploader__name">{{ displayName(file) }}</span>
          <span class="ky-uploader__description">
            {{ file.message || statusText(file) }}
          </span>
        </div>

        <div
          v-if="file.status === 'uploading'"
          class="ky-uploader__status ky-uploader__status--uploading"
          role="status"
          aria-live="polite"
        >
          <KyLoading size="22" color="currentColor" />
          <span>{{ normalizedPercent(file.percent) }}%</span>
        </div>
        <div
          v-else-if="file.status === 'failed'"
          class="ky-uploader__status ky-uploader__status--failed"
          role="status"
        >
          <button
            v-if="file.file && request && !disabled && !readonly"
            type="button"
            class="ky-uploader__retry"
            :aria-label="'重新上传 ' + displayName(file)"
            @click="retry(file)"
          >
            <KyIcon name="upload" source="iconfont" :size="20" />
          </button>
          <KyIcon v-else name="close" :size="20" />
          <span>{{ file.message || '上传失败' }}</span>
        </div>
        <span v-else-if="file.status === 'done'" class="ky-uploader__done" aria-label="上传完成">
          <KyIcon name="check" :size="14" />
        </span>

        <button
          v-if="canDelete(file)"
          type="button"
          class="ky-uploader__delete"
          :aria-label="'删除 ' + displayName(file)"
          @click="remove(file)"
        >
          <KyIcon name="close" :size="16" />
        </button>
      </div>

      <label
        v-if="showUploadButton"
        class="ky-uploader__upload"
        :class="{ 'is-disabled': disabled }"
      >
        <input
          ref="inputRef"
          class="ky-uploader__input"
          type="file"
          :name="name"
          :accept="accept"
          :capture="capture"
          :multiple="multiple"
          :disabled="disabled"
          :aria-label="uploadText || '选择文件'"
          @click="emit('clickUpload')"
          @change="handleInputChange"
        />
        <span class="ky-uploader__upload-content">
          <slot name="upload" :disabled="disabled" :choose-file="chooseFile">
            <KyIcon :name="uploadIcon" source="auto" :size="28" />
            <span v-if="uploadText">{{ uploadText }}</span>
          </slot>
        </span>
      </label>
    </div>

    <KyImagePreview
      v-bind="previewOptions"
      v-model="previewVisible"
      :images="previewImages"
      :start-position="previewStart"
      @close="handlePreviewClose"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import type { CSSProperties } from 'vue';
import KyIcon from '../icon';
import KyImagePreview from '../image-preview';
import KyLoading from '../loading';
import type {
  UploaderChangePayload,
  UploaderChangeSource,
  UploaderDetail,
  UploaderFile,
  UploaderProgressPayload,
  UploaderProps,
  UploaderRejectedFile,
  UploaderSelectPayload,
} from './uploader';
import { isUploaderImage, matchesUploaderAccept, resolveUploaderPreviewSize } from './uploader';

defineOptions({ name: 'KyUploader' });

type InternalUploaderFile = UploaderFile & { uid: string };

const props = withDefaults(defineProps<UploaderProps>(), {
  modelValue: () => [],
  name: 'file',
  accept: 'image/*',
  capture: undefined,
  multiple: false,
  disabled: false,
  readonly: false,
  maxCount: Infinity,
  maxSize: Infinity,
  resultType: 'file',
  listType: 'picture-card',
  imageFit: 'cover',
  previewSize: 88,
  previewImage: true,
  previewOptions: () => ({}),
  showUpload: true,
  showFileName: false,
  deletable: true,
  autoUpload: true,
  uploadText: '',
  uploadIcon: 'camera',
  beforeRead: undefined,
  beforeDelete: undefined,
  request: undefined,
});
const emit = defineEmits<{
  'update:modelValue': [files: UploaderFile[]];
  change: [payload: UploaderChangePayload];
  select: [payload: UploaderSelectPayload];
  afterRead: [files: UploaderFile[], detail: UploaderDetail];
  reject: [files: UploaderRejectedFile[], detail: UploaderDetail];
  oversize: [files: File[], detail: UploaderDetail];
  clickUpload: [];
  clickPreview: [file: UploaderFile, detail: UploaderDetail];
  closePreview: [index: number];
  delete: [file: UploaderFile, detail: UploaderDetail];
  uploadStart: [file: UploaderFile];
  uploadProgress: [payload: UploaderProgressPayload];
  uploadSuccess: [file: UploaderFile, response: unknown];
  uploadError: [file: UploaderFile, error: unknown];
}>();

const inputRef = ref<HTMLInputElement | null>(null);
const previewVisible = ref(false);
const previewStart = ref(0);
const ownedUrls = new Set<string>();
const requestControllers = new Map<string, AbortController>();
let uidSeed = 0;

function createUid() {
  uidSeed += 1;
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `ky-uploader-${Date.now()}-${uidSeed}`;
}

function normalizedPercent(value?: number) {
  const percent = Number(value);
  if (!Number.isFinite(percent)) return 0;
  return Math.min(100, Math.max(0, Math.round(percent)));
}

function normalizeFile(file: UploaderFile): InternalUploaderFile {
  return {
    ...file,
    uid: file.uid || createUid(),
    name: file.name ?? file.file?.name,
    type: file.type ?? file.file?.type,
    size: file.size ?? file.file?.size,
    status: file.status ?? (file.url || file.thumbUrl ? 'done' : 'ready'),
    percent: normalizedPercent(file.percent),
  };
}

const files = ref<InternalUploaderFile[]>(props.modelValue.map(normalizeFile));
const normalizedMaxCount = computed(() =>
  Number.isFinite(props.maxCount) ? Math.max(0, Math.floor(props.maxCount)) : Infinity,
);
const showUploadButton = computed(
  () => props.showUpload && !props.readonly && files.value.length < normalizedMaxCount.value,
);
const previewImages = computed(() =>
  files.value.flatMap((file) => {
    const source = fileSource(file);
    return isImage(file) && source
      ? [{ src: source, alt: file.name || '上传图片', caption: file.name }]
      : [];
  }),
);
const uploaderStyle = computed<CSSProperties>(() => {
  const [width, height] = resolveUploaderPreviewSize(props.previewSize);
  return {
    '--ky-uploader-preview-width': width,
    '--ky-uploader-preview-height': height,
    '--ky-uploader-image-fit': props.imageFit,
  } as CSSProperties;
});

function publicList(list = files.value): UploaderFile[] {
  return list.map((file) => ({ ...file }));
}

function commit(
  nextFiles: InternalUploaderFile[],
  file: InternalUploaderFile | undefined,
  source: UploaderChangeSource,
) {
  files.value = nextFiles;
  const nextPublicList = publicList(nextFiles);
  emit('update:modelValue', nextPublicList);
  emit('change', { file: file ? { ...file } : undefined, fileList: nextPublicList, source });
}

function cleanupOwnedUrls(activeFiles = files.value) {
  if (typeof URL === 'undefined') return;
  const activeUrls = new Set(
    activeFiles.flatMap((file) => [file.url, file.thumbUrl].filter((url): url is string => !!url)),
  );
  ownedUrls.forEach((url) => {
    if (activeUrls.has(url)) return;
    URL.revokeObjectURL(url);
    ownedUrls.delete(url);
  });
}

function fileSource(file: UploaderFile) {
  return (
    file.thumbUrl ?? file.url ?? (file.content?.startsWith('data:') ? file.content : undefined)
  );
}

function isImage(file: UploaderFile) {
  return isUploaderImage(file);
}

function displayName(file: UploaderFile) {
  return file.name || file.file?.name || '未命名文件';
}

function previewLabel(file: UploaderFile) {
  return isImage(file) ? `预览 ${displayName(file)}` : displayName(file);
}

function statusText(file: UploaderFile) {
  if (file.status === 'uploading') return `上传中 ${normalizedPercent(file.percent)}%`;
  if (file.status === 'failed') return '上传失败';
  if (file.status === 'done') return '上传完成';
  return file.size === undefined ? '等待上传' : formatFileSize(file.size);
}

function formatFileSize(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

function findIndex(target: UploaderFile | string) {
  const uid = typeof target === 'string' ? target : target.uid;
  return files.value.findIndex((file) => (uid ? file.uid === uid : file === target));
}

function patchFile(
  uid: string,
  patch: Partial<InternalUploaderFile>,
  source: UploaderChangeSource,
) {
  const index = files.value.findIndex((file) => file.uid === uid);
  if (index < 0) return undefined;
  const nextFile = { ...files.value[index], ...patch };
  const nextFiles = [...files.value];
  nextFiles[index] = nextFile;
  commit(nextFiles, nextFile, source);
  return nextFile;
}

function canDelete(file: UploaderFile) {
  return props.deletable && file.deletable !== false && !props.disabled && !props.readonly;
}

function chooseFile() {
  if (props.disabled || props.readonly || !showUploadButton.value) return;
  inputRef.value?.click();
}

function isOversize(file: File) {
  return typeof props.maxSize === 'function'
    ? props.maxSize(file)
    : Number.isFinite(props.maxSize) && file.size > Number(props.maxSize);
}

function readFile(file: File): Promise<string | undefined> {
  if (props.resultType === 'file') return Promise.resolve(undefined);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error ?? new Error('文件读取失败'));
    reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : undefined);
    if (props.resultType === 'text') reader.readAsText(file);
    else reader.readAsDataURL(file);
  });
}

async function createUploadItem(file: File): Promise<InternalUploaderFile> {
  const content = await readFile(file);
  let url = props.resultType === 'dataUrl' && file.type.startsWith('image/') ? content : undefined;
  if (!url && file.type.startsWith('image/') && typeof URL !== 'undefined') {
    url = URL.createObjectURL(file);
    ownedUrls.add(url);
  }
  return normalizeFile({
    file,
    name: file.name,
    type: file.type,
    size: file.size,
    content,
    url,
    isImage: file.type.startsWith('image/'),
    status: 'ready',
  });
}

async function handleInputChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const selected = Array.from(input.files ?? []);
  input.value = '';
  if (!selected.length || props.disabled || props.readonly) return;

  const accepted: InternalUploaderFile[] = [];
  const rejected: UploaderRejectedFile[] = [];
  const oversizeFiles: File[] = [];
  const initialLength = files.value.length;

  for (const originalFile of selected) {
    if (initialLength + accepted.length >= normalizedMaxCount.value) {
      rejected.push({ file: originalFile, reason: 'max-count' });
      continue;
    }

    const detail = { name: props.name, index: initialLength + accepted.length };
    let file = originalFile;
    try {
      if (props.beforeRead) {
        const result = await props.beforeRead(originalFile, detail);
        if (result === false || result === null) {
          rejected.push({ file: originalFile, reason: 'before-read' });
          continue;
        }
        if (result instanceof File) file = result;
      }
      if (!matchesUploaderAccept(file, props.accept)) {
        rejected.push({ file, reason: 'accept' });
        continue;
      }
      if (isOversize(file)) {
        rejected.push({ file, reason: 'max-size' });
        oversizeFiles.push(file);
        continue;
      }
      accepted.push(await createUploadItem(file));
    } catch {
      rejected.push({ file, reason: 'read-error' });
    }
  }

  const detail = { name: props.name, index: initialLength };
  if (accepted.length) {
    commit([...files.value, ...accepted], accepted[accepted.length - 1], 'select');
    emit('afterRead', publicList(accepted), detail);
  }
  if (rejected.length) emit('reject', rejected, detail);
  if (oversizeFiles.length) emit('oversize', oversizeFiles, detail);
  emit('select', { accepted: publicList(accepted), rejected });

  if (accepted.length && props.request && props.autoUpload) {
    await nextTick();
    await Promise.all(accepted.map((file) => runUpload(file, 'upload')));
  }
}

function responseUrl(response: unknown) {
  if (!response || typeof response !== 'object' || !('url' in response)) return undefined;
  return typeof response.url === 'string' ? response.url : undefined;
}

function errorMessage(error: unknown) {
  return error instanceof Error && error.message ? error.message : '上传失败';
}

async function runUpload(target: UploaderFile, source: 'upload' | 'retry') {
  if (!props.request || !target.file || props.disabled || props.readonly) return;
  const index = findIndex(target);
  if (index < 0) return;
  const current = files.value[index];
  requestControllers.get(current.uid)?.abort();
  const controller = new AbortController();
  requestControllers.set(current.uid, controller);
  const uploading = patchFile(
    current.uid,
    { status: 'uploading', percent: 0, message: '', response: undefined },
    source,
  );
  if (!uploading) return;
  emit('uploadStart', { ...uploading });

  try {
    const response = await props.request({
      file: uploading.file as File,
      item: { ...uploading },
      fileList: publicList(),
      signal: controller.signal,
      onProgress: (percent) => {
        if (controller.signal.aborted || requestControllers.get(current.uid) !== controller) return;
        const progressFile = patchFile(
          current.uid,
          { status: 'uploading', percent: normalizedPercent(percent) },
          source,
        );
        if (progressFile) {
          emit('uploadProgress', {
            file: { ...progressFile },
            percent: normalizedPercent(percent),
          });
        }
      },
    });
    if (controller.signal.aborted || requestControllers.get(current.uid) !== controller) return;
    const url = responseUrl(response);
    if (url && uploading.url && ownedUrls.has(uploading.url) && typeof URL !== 'undefined') {
      URL.revokeObjectURL(uploading.url);
      ownedUrls.delete(uploading.url);
    }
    const completed = patchFile(
      current.uid,
      { status: 'done', percent: 100, message: '', response, ...(url ? { url } : {}) },
      source,
    );
    if (completed) emit('uploadSuccess', { ...completed }, response);
  } catch (error) {
    if (controller.signal.aborted || requestControllers.get(current.uid) !== controller) return;
    const failed = patchFile(
      current.uid,
      { status: 'failed', message: errorMessage(error) },
      source,
    );
    if (failed) emit('uploadError', { ...failed }, error);
  } finally {
    if (requestControllers.get(current.uid) === controller) {
      requestControllers.delete(current.uid);
    }
  }
}

async function upload(target?: UploaderFile | string) {
  if (target) {
    const index = findIndex(target);
    if (index >= 0) await runUpload(files.value[index], 'upload');
    return;
  }
  const pending = files.value.filter(
    (file) => file.file && (file.status === 'ready' || file.status === 'failed'),
  );
  await Promise.all(pending.map((file) => runUpload(file, 'upload')));
}

async function retry(file: UploaderFile) {
  await runUpload(file, 'retry');
}

async function remove(target: UploaderFile | string) {
  if (props.disabled || props.readonly) return;
  let index = findIndex(target);
  if (index < 0) return;
  const file = files.value[index];
  if (!canDelete(file)) return;
  const detail = { name: props.name, index };
  if (props.beforeDelete && (await props.beforeDelete({ ...file }, detail)) === false) return;

  index = files.value.findIndex((item) => item.uid === file.uid);
  if (index < 0) return;
  requestControllers.get(file.uid)?.abort();
  requestControllers.delete(file.uid);
  const nextFiles = files.value.filter((item) => item.uid !== file.uid);
  commit(nextFiles, file, 'remove');
  cleanupOwnedUrls(nextFiles);
  emit('delete', { ...file }, { name: props.name, index });
}

async function clear() {
  if (props.disabled || props.readonly) return;
  const snapshot = [...files.value];
  const removable = new Set<string>();
  for (const [index, file] of snapshot.entries()) {
    if (!canDelete(file)) continue;
    const detail = { name: props.name, index };
    if (props.beforeDelete && (await props.beforeDelete({ ...file }, detail)) === false) continue;
    removable.add(file.uid);
  }
  if (!removable.size) return;
  removable.forEach((uid) => {
    requestControllers.get(uid)?.abort();
    requestControllers.delete(uid);
  });
  const nextFiles = files.value.filter((file) => !removable.has(file.uid));
  commit(nextFiles, undefined, 'clear');
  cleanupOwnedUrls(nextFiles);
  snapshot.forEach((file, index) => {
    if (removable.has(file.uid)) emit('delete', { ...file }, { name: props.name, index });
  });
}

function handlePreview(file: UploaderFile, index: number) {
  if (props.disabled) return;
  emit('clickPreview', { ...file }, { name: props.name, index });
  const source = fileSource(file);
  if (!props.previewImage || !isImage(file) || !source) return;
  previewStart.value = files.value
    .slice(0, index)
    .filter((item) => isImage(item) && fileSource(item)).length;
  previewVisible.value = true;
}

function handlePreviewClose(index: number) {
  emit('closePreview', index);
}

watch(
  () => props.modelValue,
  (value) => {
    files.value = value.map(normalizeFile);
    cleanupOwnedUrls(files.value);
  },
  { deep: true },
);

onBeforeUnmount(() => {
  requestControllers.forEach((controller) => controller.abort());
  requestControllers.clear();
  if (typeof URL !== 'undefined') {
    ownedUrls.forEach((url) => URL.revokeObjectURL(url));
  }
  ownedUrls.clear();
});

defineExpose({ chooseFile, upload, remove, clear });
</script>
