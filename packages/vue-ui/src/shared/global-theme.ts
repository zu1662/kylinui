import type { KylinTheme } from '../theme';
import { KYLIN_THEME_ATTRIBUTE } from '../theme';

interface GlobalThemeEntry {
  owner: symbol;
  theme: KylinTheme;
  themeVars: Record<string, string>;
}

interface InlineStyleSnapshot {
  value: string;
  priority: string;
}

const entries: GlobalThemeEntry[] = [];
const originalTheme = { captured: false, value: null as string | null };
const originalThemeVars = new Map<string, InlineStyleSnapshot>();

function getRootElement() {
  return typeof document === 'undefined' ? undefined : document.documentElement;
}

function captureOriginalTheme(root: HTMLElement) {
  if (originalTheme.captured) return;
  originalTheme.captured = true;
  originalTheme.value = root.getAttribute(KYLIN_THEME_ATTRIBUTE);
}

function restoreOriginalTheme(root: HTMLElement) {
  if (!originalTheme.captured) return;
  if (originalTheme.value === null) root.removeAttribute(KYLIN_THEME_ATTRIBUTE);
  else root.setAttribute(KYLIN_THEME_ATTRIBUTE, originalTheme.value);
  originalTheme.captured = false;
  originalTheme.value = null;
}

function restoreOriginalThemeVar(root: HTMLElement, name: string) {
  const snapshot = originalThemeVars.get(name);
  if (!snapshot) return;
  if (snapshot.value) root.style.setProperty(name, snapshot.value, snapshot.priority);
  else root.style.removeProperty(name);
  originalThemeVars.delete(name);
}

function syncDocumentTheme() {
  const root = getRootElement();
  if (!root) return;

  if (!entries.length) {
    restoreOriginalTheme(root);
    [...originalThemeVars.keys()].forEach((name) => restoreOriginalThemeVar(root, name));
    return;
  }

  captureOriginalTheme(root);
  root.setAttribute(KYLIN_THEME_ATTRIBUTE, entries.at(-1)!.theme);

  const activeThemeVars = new Map<string, string>();
  entries.forEach((entry) => {
    Object.entries(entry.themeVars).forEach(([name, value]) => activeThemeVars.set(name, value));
  });

  activeThemeVars.forEach((value, name) => {
    if (!originalThemeVars.has(name)) {
      originalThemeVars.set(name, {
        value: root.style.getPropertyValue(name),
        priority: root.style.getPropertyPriority(name),
      });
    }
    root.style.setProperty(name, value);
  });

  [...originalThemeVars.keys()].forEach((name) => {
    if (!activeThemeVars.has(name)) restoreOriginalThemeVar(root, name);
  });
}

/** 同步一个全局 ConfigProvider，并按挂载顺序叠加主题变量。 */
export function syncGlobalTheme(
  owner: symbol,
  theme: KylinTheme,
  themeVars: Record<string, string>,
) {
  const current = entries.find((entry) => entry.owner === owner);
  if (current) {
    current.theme = theme;
    current.themeVars = themeVars;
  } else {
    entries.push({ owner, theme, themeVars });
  }
  syncDocumentTheme();
}

/** 移除一个全局 ConfigProvider，并恢复下层配置或挂载前的页面值。 */
export function removeGlobalTheme(owner: symbol) {
  const index = entries.findIndex((entry) => entry.owner === owner);
  if (index < 0) return;
  entries.splice(index, 1);
  syncDocumentTheme();
}
