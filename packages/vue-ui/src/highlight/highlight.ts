export type HighlightKeywords = string | string[];

export interface HighlightProps {
  /** 待处理的完整文本。 */
  text?: string;
  /** 需要强调的关键词，支持单个文本或文本数组。 */
  keywords?: HighlightKeywords;
  /** 是否区分英文字母大小写。 */
  caseSensitive?: boolean;
  /** 是否按普通文本匹配；关闭后关键词会按正则表达式解析。 */
  literal?: boolean;
  /** 根节点标签名。 */
  tag?: keyof HTMLElementTagNameMap;
}

export interface HighlightChunk {
  text: string;
  highlighted: boolean;
}

interface HighlightRange {
  start: number;
  end: number;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function collectRanges(
  text: string,
  keywords: HighlightKeywords,
  caseSensitive: boolean,
  literal: boolean,
): HighlightRange[] {
  const values = (Array.isArray(keywords) ? keywords : [keywords]).filter(Boolean);
  const flags = caseSensitive ? 'g' : 'gi';
  const ranges: HighlightRange[] = [];

  values.forEach((keyword) => {
    try {
      const pattern = literal ? escapeRegExp(keyword) : keyword;
      const matcher = new RegExp(pattern, flags);
      let match = matcher.exec(text);

      while (match) {
        const start = match.index;
        const end = start + match[0].length;

        if (end > start) {
          ranges.push({ start, end });
        } else {
          // 正则可能产生零长度匹配，主动前进以避免无限循环。
          matcher.lastIndex += 1;
        }

        match = matcher.exec(text);
      }
    } catch {
      // 配置实验台允许输入正则；无效表达式按无匹配处理，避免破坏整页渲染。
    }
  });

  return ranges
    .sort((left, right) => left.start - right.start || left.end - right.end)
    .reduce<HighlightRange[]>((merged, range) => {
      const previous = merged.at(-1);

      if (!previous || range.start > previous.end) {
        merged.push({ ...range });
      } else {
        previous.end = Math.max(previous.end, range.end);
      }

      return merged;
    }, []);
}

export function createHighlightChunks(
  text: string,
  keywords: HighlightKeywords,
  caseSensitive = false,
  literal = true,
): HighlightChunk[] {
  const ranges = collectRanges(text, keywords, caseSensitive, literal);

  if (!ranges.length) {
    return text ? [{ text, highlighted: false }] : [];
  }

  const chunks: HighlightChunk[] = [];
  let cursor = 0;

  ranges.forEach((range) => {
    if (range.start > cursor) {
      chunks.push({ text: text.slice(cursor, range.start), highlighted: false });
    }

    chunks.push({ text: text.slice(range.start, range.end), highlighted: true });
    cursor = range.end;
  });

  if (cursor < text.length) {
    chunks.push({ text: text.slice(cursor), highlighted: false });
  }

  return chunks;
}
