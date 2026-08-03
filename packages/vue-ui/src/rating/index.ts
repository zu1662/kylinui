import Rating from './rating.vue';
import { withInstall } from '../shared/with-install';
export const KyRating = withInstall(Rating, 'KyRating');
export default KyRating;
export type { RatingProps } from './rating';
