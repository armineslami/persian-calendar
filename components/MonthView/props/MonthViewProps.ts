import { PersianCalendarTheme, Day } from "../../../props";

interface MonthViewProps {
  theme: PersianCalendarTheme;
  month: number;
  days: Day[];
  onDayClick?: (day: Day) => void;
}

export default MonthViewProps;
