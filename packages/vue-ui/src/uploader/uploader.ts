import type { ComponentPublicInstance } from 'vue';
import type { ImageFit } from '../image';
import type { ImagePreviewProps } from '../image-preview';

export type UploaderStatus = 'ready' | 'uploading' | 'done' | 'failed';
export type UploaderResultType = 'file' | 'dataUrl' | 'text';
export type UploaderListType = 'picture-card' | 'list';
export type UploaderPreviewSize = number | string | [number | string, number | string];
export type UploaderMaxSize = number | ((file: File) => boolean);
export type UploaderRejectReason =
  'accept' | 'max-count' | 'max-size' | 'before-read' | 'read-error';
export type UploaderChangeSource = 'select' | 'remove' | 'upload' | 'retry' | 'clear';

export interface UploaderFile {
  uid?: string;
  name?: string;
  url?: string;
  thumbUrl?: string;
  file?: File;
  type?: string;
  size?: number;
  content?: string;
  status?: UploaderStatus;
  message?: string;
  percent?: number;
  response?: unknown;
  isImage?: boolean;
  deletable?: boolean;
}

export interface UploaderDetail {
  name: string;
  index: number;
}

export interface UploaderRejectedFile {
  file: File;
  reason: UploaderRejectReason;
}

export interface UploaderSelectPayload {
  accepted: UploaderFile[];
  rejected: UploaderRejectedFile[];
}

export interface UploaderChangePayload {
  file?: UploaderFile;
  fileList: UploaderFile[];
  source: UploaderChangeSource;
}

export interface UploaderProgressPayload {
  file: UploaderFile;
  percent: number;
}

export interface UploaderRequestOptions {
  file: File;
  item: UploaderFile;
  fileList: UploaderFile[];
  signal: AbortSignal;
  onProgress: (percent: number) => void;
}

export type UploaderRequest = (options: UploaderRequestOptions) => unknown | Promise<unknown>;
export type UploaderBeforeReadResult = boolean | File | null | undefined;
export type UploaderBeforeRead = (
  file: File,
  detail: UploaderDetail,
) => UploaderBeforeReadResult | Promise<UploaderBeforeReadResult>;
export type UploaderBeforeDelete = (
  file: UploaderFile,
  detail: UploaderDetail,
) => boolean | void | Promise<boolean | void>;
export type UploaderPreviewOptions = Omit<
  ImagePreviewProps,
  'modelValue' | 'images' | 'startPosition'
>;

export interface UploaderProps {
  modelValue?: UploaderFile[];
  name?: string;
  accept?: string;
  capture?: boolean | 'user' | 'environment';
  multiple?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  maxCount?: number;
  maxSize?: UploaderMaxSize;
  resultType?: UploaderResultType;
  listType?: UploaderListType;
  imageFit?: ImageFit;
  previewSize?: UploaderPreviewSize;
  previewImage?: boolean;
  previewOptions?: UploaderPreviewOptions;
  showUpload?: boolean;
  showFileName?: boolean;
  deletable?: boolean;
  autoUpload?: boolean;
  uploadText?: string;
  uploadIcon?: string;
  beforeRead?: UploaderBeforeRead;
  beforeDelete?: UploaderBeforeDelete;
  request?: UploaderRequest;
}

export interface UploaderExpose {
  chooseFile: () => void;
  upload: (target?: UploaderFile | string) => Promise<void>;
  remove: (target: UploaderFile | string) => Promise<void>;
  clear: () => Promise<void>;
}

export type UploaderInstance = ComponentPublicInstance<UploaderProps, UploaderExpose>;

export function resolveUploaderSize(value: number | string): string {
  return typeof value === 'number' ? String(value) + 'px' : value;
}

export function resolveUploaderPreviewSize(value: UploaderPreviewSize): [string, string] {
  if (Array.isArray(value)) {
    return [resolveUploaderSize(value[0]), resolveUploaderSize(value[1])];
  }
  const size = resolveUploaderSize(value);
  return [size, size];
}

export function isUploaderImage(file: UploaderFile): boolean {
  if (typeof file.isImage === 'boolean') return file.isImage;
  const type = file.type ?? file.file?.type ?? '';
  if (type.startsWith('image/')) return true;
  const source = file.thumbUrl ?? file.url ?? file.name ?? file.file?.name ?? '';
  return /\.(avif|bmp|gif|jpe?g|png|svg|webp)(?:$|[?#])/i.test(source);
}

export function matchesUploaderAccept(file: File, accept: string): boolean {
  const rules = accept
    .split(',')
    .map((rule) => rule.trim().toLowerCase())
    .filter(Boolean);
  if (!rules.length) return true;
  const fileName = file.name.toLowerCase();
  const fileType = file.type.toLowerCase();
  return rules.some((rule) => {
    if (rule === '*' || rule === '*/*') return true;
    if (rule.startsWith('.')) return fileName.endsWith(rule);
    if (rule.endsWith('/*')) return fileType.startsWith(rule.slice(0, -1));
    return fileType === rule;
  });
}
