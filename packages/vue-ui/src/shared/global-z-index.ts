import { shallowRef } from 'vue';

interface GlobalZIndexEntry {
  owner: symbol;
  value?: number;
}

const entries: GlobalZIndexEntry[] = [];
const globalZIndex = shallowRef<number>();

function refreshGlobalZIndex() {
  globalZIndex.value = [...entries].reverse().find((entry) => entry.value !== undefined)?.value;
}

/** 返回 ConfigProvider 设置的全局浮层层级；未配置时使用组件自己的默认值。 */
export function getGlobalZIndex(fallback: number) {
  return globalZIndex.value ?? fallback;
}

/** 同步一个 ConfigProvider 的浮层层级，后挂载的有效配置优先。 */
export function syncGlobalZIndex(owner: symbol, value?: number) {
  const normalizedValue = value !== undefined && Number.isFinite(value) ? value : undefined;
  const current = entries.find((entry) => entry.owner === owner);
  if (current) current.value = normalizedValue;
  else entries.push({ owner, value: normalizedValue });
  refreshGlobalZIndex();
}

/** 移除一个 ConfigProvider 的浮层层级，并恢复下层配置。 */
export function removeGlobalZIndex(owner: symbol) {
  const index = entries.findIndex((entry) => entry.owner === owner);
  if (index < 0) return;
  entries.splice(index, 1);
  refreshGlobalZIndex();
}
