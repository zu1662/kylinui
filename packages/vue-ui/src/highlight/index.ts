import Highlight from './highlight.vue';
import { withInstall } from '../shared/with-install';

export const KyHighlight = withInstall(Highlight, 'KyHighlight');
export default KyHighlight;
export type { HighlightChunk, HighlightKeywords, HighlightProps } from './highlight';
export { createHighlightChunks } from './highlight';
