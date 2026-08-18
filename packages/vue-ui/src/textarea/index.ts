import Textarea from './textarea.vue';
import { withInstall } from '../shared/with-install';

export const KyTextarea = withInstall(Textarea, 'KyTextarea');
export default KyTextarea;
export type { TextareaAutosize, TextareaAutosizeOptions, TextareaProps } from './textarea';
