import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import less from 'highlight.js/lib/languages/less';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import MarkdownIt from 'markdown-it';

const LANGUAGE_ALIASES: Record<string, string> = {
  html: 'xml',
  js: 'javascript',
  jsx: 'javascript',
  sh: 'bash',
  shell: 'bash',
  ts: 'typescript',
  tsx: 'typescript',
  vue: 'xml',
};

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('css', css);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('less', less);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);

const md = new MarkdownIt({ html: false, linkify: true, typographer: true });

md.options.highlight = (source, info) => {
  const requestedLanguage = info.trim().split(/\s+/u)[0]?.toLowerCase() ?? '';
  const language = LANGUAGE_ALIASES[requestedLanguage] ?? requestedLanguage;
  const safeLanguage = requestedLanguage.replace(/[^a-z0-9_-]/gu, '');
  const languageClass = safeLanguage ? ` language-${safeLanguage}` : '';
  const content =
    language && hljs.getLanguage(language)
      ? hljs.highlight(source, { language, ignoreIllegals: true }).value
      : md.utils.escapeHtml(source);

  return `<pre class="markdown-code"><code class="hljs${languageClass}">${content}</code></pre>`;
};

export function normalizeMarkdown(source: string) {
  // Vite 的 ?raw 会保留 UTF-8 BOM；统一清理，避免首个 Markdown 标题被当作普通文本。
  return source.replace(/^\uFEFF/u, '');
}

export function renderMarkdown(source: string) {
  return md.render(normalizeMarkdown(source));
}
