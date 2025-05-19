import { PersianCalendarEvent } from "./";

export type Day = {
  id: string;
  title: string;
  active?: boolean;
  enabled?: boolean;
  isOffDay?: boolean;
  event?: PersianCalendarEvent[];
  month?: number;
};
