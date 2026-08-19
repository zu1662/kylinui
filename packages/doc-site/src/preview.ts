import type { KylinTheme } from '@kylinui/vue';

export type PreviewMode = 'usage' | 'demo';

export const PREVIEW_MESSAGE_SOURCE = 'kylin-ui-doc-site';

export interface PreviewPropsMessage {
  source: typeof PREVIEW_MESSAGE_SOURCE;
  type: 'preview:props';
  slug: string;
  payload: Record<string, unknown>;
}

/** 根据当前部署地址生成同源预览页地址，兼容站点部署在二级目录的场景。 */
export function createPreviewUrl(slug: string, mode: PreviewMode, theme: KylinTheme) {
  const url = new URL(window.location.href);
  url.hash = '';
  url.search = '';
  url.searchParams.set('preview', mode);
  url.searchParams.set('component', slug);
  url.searchParams.set('theme', theme);
  return url.toString();
}

/** 创建父页面发送给手机预览页的配置消息。 */
export function createPreviewPropsMessage(
  slug: string,
  payload: Record<string, unknown>,
): PreviewPropsMessage {
  return {
    source: PREVIEW_MESSAGE_SOURCE,
    type: 'preview:props',
    slug,
    payload,
  };
}

/** 对跨 iframe 消息做结构校验，避免处理无关页面发送的数据。 */
export function isPreviewPropsMessage(value: unknown): value is PreviewPropsMessage {
  if (!value || typeof value !== 'object') return false;
  const message = value as Partial<PreviewPropsMessage>;
  return (
    message.source === PREVIEW_MESSAGE_SOURCE &&
    message.type === 'preview:props' &&
    typeof message.slug === 'string' &&
    Boolean(message.payload) &&
    typeof message.payload === 'object'
  );
}
