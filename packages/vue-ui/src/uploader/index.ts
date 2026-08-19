import Uploader from './uploader.vue';
import { withInstall } from '../shared/with-install';

export const KyUploader = withInstall(Uploader, 'KyUploader');
export default KyUploader;
export {
  isUploaderImage,
  matchesUploaderAccept,
  resolveUploaderPreviewSize,
  resolveUploaderSize,
} from './uploader';
export type {
  UploaderBeforeDelete,
  UploaderBeforeRead,
  UploaderBeforeReadResult,
  UploaderChangePayload,
  UploaderChangeSource,
  UploaderDetail,
  UploaderExpose,
  UploaderFile,
  UploaderInstance,
  UploaderListType,
  UploaderMaxSize,
  UploaderPreviewOptions,
  UploaderPreviewSize,
  UploaderProgressPayload,
  UploaderProps,
  UploaderRejectedFile,
  UploaderRejectReason,
  UploaderRequest,
  UploaderRequestOptions,
  UploaderResultType,
  UploaderSelectPayload,
  UploaderStatus,
} from './uploader';
