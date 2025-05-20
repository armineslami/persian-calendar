import { PersianCalendarTheme, Day } from "../../../props";
import { Month } from "../../../props/Month";

interface YearViewProps {
  months: Month[];
  theme: PersianCalendarTheme;
  gridColumnCount: number;
  onDayClick?: (day: Day) => void;
}

export default YearViewProps;
