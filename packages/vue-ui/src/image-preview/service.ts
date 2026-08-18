import { createVNode, reactive, render } from 'vue';
import { getGlobalServiceDefaults, getGlobalTeleport } from '../shared/global-config-provider';
import { getOverlayContainer } from '../shared/overlay-manager';
import { applyServiceAppContext } from '../shared/service-app-context';
import ImagePreviewServiceHost from './image-preview-service-host.vue';
import type { ImagePreviewProps, ImagePreviewSource } from './image-preview';

export interface ImagePreviewOptions extends Omit<ImagePreviewProps, 'modelValue'> {
  onChange?: (index: number) => void;
  onScale?: (scale: number, index: number) => void;
  onClose?: (index: number) => void;
  onClosed?: () => void;
}

export interface ImagePreviewServiceState {
  visible: boolean;
  options: ImagePreviewOptions;
}

export const imagePreviewServiceState: ImagePreviewServiceState = reactive({
  visible: false,
  options: { images: [] },
});

let hostElement: HTMLDivElement | undefined;

function ensureImagePreviewHost() {
  if (typeof document === 'undefined' || hostElement) return;
  hostElement = document.createElement('div');
  hostElement.dataset.kyImagePreviewHost = '';
  document.body.appendChild(hostElement);
  render(applyServiceAppContext(createVNode(ImagePreviewServiceHost)), hostElement);
}

export function showImagePreview(images: ImagePreviewSource[]): { close: () => void };
export function showImagePreview(options: ImagePreviewOptions): { close: () => void };
export function showImagePreview(optionsOrImages: ImagePreviewOptions | ImagePreviewSource[]): {
  close: () => void;
} {
  ensureImagePreviewHost();
  const defaults = {
    teleport: getGlobalTeleport(getOverlayContainer()),
    ...getGlobalServiceDefaults('imagePreview'),
  };
  imagePreviewServiceState.options = Array.isArray(optionsOrImages)
    ? { ...defaults, images: optionsOrImages }
    : { ...defaults, ...optionsOrImages };
  imagePreviewServiceState.visible = true;
  return { close: closeImagePreview };
}

export function closeImagePreview() {
  imagePreviewServiceState.visible = false;
}

export function useImagePreview() {
  return { open: showImagePreview, close: closeImagePreview };
}
