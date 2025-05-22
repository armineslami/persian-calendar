import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PersianCalendarEvent, Day } from "../props";
import { Month } from "../props/Month";
// @ts-ignore
const moment = require("moment-jalaali");

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createYearMonth(
  year: string,
  events: PersianCalendarEvent[],
  offDates: string[],
  offDaysOfWeek: number[],
  monthTitleFormat: string
): Month[] {
  const dateFormat = "jYYYY/jMM/jDD";
  const months = [];

  for (let month = 1; month <= 12; month++) {
    // Get the count of days in the month
    const daysInMonth = moment.jDaysInMonth(Number(year), month - 1);

    /**
     * Calculate the start day of the month. It returns a number
     * between 0 to 6. 0 is for saturday and 6 is for friday
     */
    const monthStart = moment(`${year}/${month}/1`, dateFormat);
    // moment-jalaali uses .weekday() for Persian week days when loaded with correct dialect
    const offset = monthStart.weekday();

    const days: Day[] = [];

    // Add empty placeholders for offset
    for (let i = 0; i < offset; i++) {
      days.push({
        id: (-1 * (i + 1)).toString(),
        title: "",
        active: false,
        enabled: false,
      });
    }

    const todayJDate = moment().format(dateFormat);

    // Now push the actual days
    for (let i = 0; i < daysInMonth; i++) {
      const currentDate = moment(`${year}/${month}/${i + 1}`, dateFormat);
      const isOffDay =
        offDaysOfWeek.includes(currentDate.weekday()) ||
        offDates.includes(currentDate.format(dateFormat));
      const event = events.filter(
        (event) => event.date === currentDate.format(dateFormat)
      );
      days.push({
        id: currentDate.format(dateFormat),
        title: toPersianDigits(`${i + 1}`),
        active: currentDate.format(dateFormat) === todayJDate,
        enabled: true,
        isOffDay: isOffDay,
        event: event,
      });
    }

    // Get the month title
    const monthTitle = monthStart.format(monthTitleFormat);

    // Push the month object
    months.push({
      id: month,
      title: monthTitle,
      days,
    });
  }

  return months;
}

export function createMonthDays(
  year: string,
  month: number,
  events: PersianCalendarEvent[],
  offDates: string[],
  offDaysOfWeek: number[]
): Day[] {
  const dateFormat = "jYYYY/jMM/jDD";
  const days: Day[] = [];
  const todayJDate = moment().format(dateFormat);
  const firstOfMonth = moment(`${year}/${month}/1`, dateFormat);
  const currentMonthLength = moment.jDaysInMonth(Number(year), month - 1);
  const startDayIndex = firstOfMonth.weekday(); // 0 = Saturday
  const previousMonth = firstOfMonth.clone().subtract(1, "jMonth");
  const nextMonth = firstOfMonth.clone().add(1, "jMonth");
  const prevMonthLength = moment.jDaysInMonth(
    previousMonth.jYear(),
    previousMonth.jMonth()
  );

  const normalizedOffDates = offDates.map((date) =>
    moment(date, ["jYYYY/jM/jD", "jYYYY/jMM/jDD"]).format(dateFormat)
  );
  const normalizedEvents = events.map((event) => ({
    ...event,
    date: moment(event.date, ["jYYYY/jM/jD", "jYYYY/jMM/jDD"]).format(
      dateFormat
    ),
  }));

  // Fill days from previous month
  for (let i = startDayIndex - 1; i >= 0; i--) {
    const date = previousMonth.clone().jDate(prevMonthLength - i);
    const formatted = date.format(dateFormat);
    days.push({
      id: formatted,
      title: toPersianDigits(date.format("jD")),
      active: formatted === todayJDate,
      enabled: false,
      isOffDay:
        offDaysOfWeek.includes(date.day()) ||
        normalizedOffDates.includes(formatted),
      event: normalizedEvents.filter((event) => event.date === formatted),
      month: month - 1,
    });
  }

  // Fill current month
  for (let i = 1; i <= currentMonthLength; i++) {
    const date = firstOfMonth.clone().jDate(i);
    const formatted = date.format(dateFormat);
    days.push({
      id: formatted,
      title: toPersianDigits(date.format("jD")),
      active: formatted === todayJDate,
      enabled: true,
      isOffDay:
        offDaysOfWeek.includes(date.day() + 1) ||
        normalizedOffDates.includes(formatted),
      event: normalizedEvents.filter((event) => event.date === formatted),
      month: month,
    });
  }

  // Fill remaining slots with next month
  const total = days.length <= 35 ? 35 : 42;
  const needed = total - days.length;
  for (let i = 1; i <= needed; i++) {
    const date = nextMonth.clone().jDate(i);
    const formatted = date.format(dateFormat);
    days.push({
      id: formatted,
      title: toPersianDigits(date.format("jD")),
      active: formatted === todayJDate,
      enabled: false,
      isOffDay:
        offDaysOfWeek.includes(date.day()) ||
        normalizedOffDates.includes(formatted),
      event: normalizedEvents.filter((event) => event.date === formatted),
      month: month + 1,
    });
  }

  return days;
}

// Converts digits of given input to persian
export function toPersianDigits(input: string | number): string {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return input
    .toString()
    .replace(/\d/g, (digit) => persianDigits[Number(digit)]);
}

// Retuns current year
export function getCurrentYear(): string {
  return moment().format("jYYYY");
}

// Returns the index of current month
export function getCurrentMonthIndex(): number {
  return parseInt(moment().format("jM"), 10);
}

// Returns the full Persian month name for a given Jalali month number (1–12)
export function getMonthName(month: number): string {
  return moment(`1400/${month}/1`, "jYYYY/jM/jD").format("jMMMM");
}
