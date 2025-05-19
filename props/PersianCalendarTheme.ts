export interface PersianCalendarTheme {
  primary?: string;
  secondary?: string;
  accent?: string;
  background?: string;
  textPrimary?: string;
  textSecondary?: string;
  borderColor?: string;
  disabledMonthBackground?: string;
  fontSize?: {
    header?: string;
    subHeader?: string;
    title?: string;
    body?: string;
    footer?: string;
  };
  fontFamily?: string;
  colors?: {
    monthTitleColor?: string;
    offDayColor?: string;
    hoverColor?: string;
  };
}
