import { PersianCalendarTheme, PersianCalendarMode } from "../../../props";

interface NavbarProps {
  year: string;
  month: number | undefined;
  theme: PersianCalendarTheme;
  mode?: PersianCalendarMode;
  hasModeSwitch?: boolean;
  onNext?: () => void;
  onPrevious?: () => void;
  onToday?: () => void;
  onModeChange?: (mode: PersianCalendarMode) => void;
}

export default NavbarProps;
