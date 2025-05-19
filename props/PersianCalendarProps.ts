import {
  PersianCalendarTheme,
  PersianCalendarEvent,
  PersianCalendarMode,
  Day,
} from "./";

export interface PersianCalendarProps {
  theme?: PersianCalendarTheme;
  mode?: PersianCalendarMode;
  className?: string;
  year: string;
  month?: number;
  events?: PersianCalendarEvent[];
  offDates?: string[];
  offDaysOfWeek?: number[];
  monthTitleFormat?: string;
  hasNavbar?: boolean;
  hasModeSwitch?: boolean;
  gridColumnCount?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  onNext?: () => void;
  onPrevious?: () => void;
  onToday?: () => void;
  onModeChange?: (mode: PersianCalendarMode) => void;
  onDayClick?: (day: Day) => void;
}
