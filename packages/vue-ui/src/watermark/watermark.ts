export interface WatermarkProps {
  content?: string | string[];
  image?: string;
  width?: number;
  height?: number;
  gapX?: number;
  gapY?: number;
  rotate?: number;
  opacity?: number;
  color?: string;
  fontSize?: number;
  zIndex?: number;
  fullPage?: boolean;
}
export function escapeWatermarkText(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[character] ??
      character,
  );
}
