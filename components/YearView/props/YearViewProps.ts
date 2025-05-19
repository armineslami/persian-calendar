import { PersianCalendarTheme, Day } from "../../../props";
import { Month } from "../../../props/Month";

interface YearViewProps {
  months: Month[];
  theme: PersianCalendarTheme;
  gridColumnCount: number;
  className?: string;
  onDayClick?: (day: Day) => void;
}

export default YearViewProps;
