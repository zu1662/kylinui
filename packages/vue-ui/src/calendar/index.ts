import Calendar from './calendar.vue';
import { withInstall } from '../shared/with-install';

export type {
  CalendarDayItem,
  CalendarDayType,
  CalendarFormatter,
  CalendarPosition,
  CalendarProps,
  CalendarSwitchMode,
  CalendarType,
  CalendarValue,
} from './calendar';
export {
  addCalendarMonths,
  clampCalendarDate,
  compareCalendarDates,
  getCalendarRangeLength,
  startOfCalendarDay,
  toCalendarDateKey,
} from './calendar';

export const KyCalendar = withInstall(Calendar, 'KyCalendar');
export default KyCalendar;
