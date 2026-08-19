import type { UsageConfig } from '../../usage';

export default {
  name: 'Uploader 文件上传',
  component: 'KyUploader',
  description: '体验多选、数量限制、上传状态、预览和列表布局。',
  props: [
    {
      name: 'accept',
      label: '文件类型',
      type: 'select',
      defaultValue: 'image/*',
      options: ['image/*', 'image/*,.pdf', '*/*'],
    },
    { name: 'multiple', label: '允许多选', type: 'boolean', defaultValue: true },
    { name: 'maxCount', label: '最大数量', type: 'number', defaultValue: 4, min: 1, max: 8 },
    {
      name: 'listType',
      label: '列表布局',
      type: 'select',
      defaultValue: 'picture-card',
      options: ['picture-card', 'list'],
    },
    { name: 'previewSize', label: '预览尺寸', type: 'number', defaultValue: 88, min: 64, max: 120 },
    { name: 'previewImage', label: '图片预览', type: 'boolean', defaultValue: true },
    { name: 'showFileName', label: '显示文件名', type: 'boolean', defaultValue: false },
    { name: 'deletable', label: '允许删除', type: 'boolean', defaultValue: true },
    { name: 'autoUpload', label: '自动上传', type: 'boolean', defaultValue: true },
    { name: 'disabled', label: '禁用', type: 'boolean', defaultValue: false },
    { name: 'readonly', label: '只读', type: 'boolean', defaultValue: false },
    { name: 'uploadText', label: '上传文案', type: 'text', defaultValue: '上传文件' },
  ],
} satisfies UsageConfig;
