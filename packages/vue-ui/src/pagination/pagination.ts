export type PaginationMode = 'multi' | 'simple';
export type PaginationItem = number | 'prev-ellipsis' | 'next-ellipsis';
export interface PaginationProps {
  modelValue?: number;
  totalItems?: number;
  itemsPerPage?: number;
  pageCount?: number;
  showPageSize?: number;
  mode?: PaginationMode;
  forceEllipses?: boolean;
  prevText?: string;
  nextText?: string;
  disabled?: boolean;
}
export function clampPage(page: number, count: number) {
  return Math.min(Math.max(Math.trunc(page) || 1, 1), Math.max(Math.trunc(count) || 1, 1));
}
export function getPaginationItems(
  current: number,
  count: number,
  size: number,
  forceEllipses: boolean,
): PaginationItem[] {
  const total = Math.max(Math.trunc(count) || 1, 1);
  const visible = Math.max(3, Math.trunc(size) || 5);
  if (total <= visible) return Array.from({ length: total }, (_, index) => index + 1);
  if (!forceEllipses) {
    let start = Math.max(1, current - Math.floor(visible / 2));
    const end = Math.min(total, start + visible - 1);
    start = Math.max(1, end - visible + 1);
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }
  const innerSize = Math.max(1, visible - 2);
  let start = Math.max(2, current - Math.floor(innerSize / 2));
  const end = Math.min(total - 1, start + innerSize - 1);
  start = Math.max(2, end - innerSize + 1);
  const items: PaginationItem[] = [1];
  if (start > 2) items.push('prev-ellipsis');
  for (let page = start; page <= end; page += 1) items.push(page);
  if (end < total - 1) items.push('next-ellipsis');
  items.push(total);
  return items;
}
