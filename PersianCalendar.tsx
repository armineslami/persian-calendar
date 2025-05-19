"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  PersianCalendarTheme,
  PersianCalendarProps,
  PersianCalendarMode,
  Day,
} from "./props";
import moment from "moment-jalaali";
import YearView from "./components/YearView/YearView";
import MonthView from "./components/MonthView/MonthView";
import Navbar from "./components/Navbar/Navbar";
import {
  cn,
  createMonthDays,
  createYearMonth,
  getCurrentMonthIndex,
  getCurrentYear,
  toPersianDigits,
} from "./lib/utils";

const defaultTheme: PersianCalendarTheme = {
  primary: "#6366f1",
  secondary: "#818cf8",
  accent: "#f43f5e",
  background: "#ffffff",
  textPrimary: "#1f2937",
  textSecondary: "#6b7280",
  borderColor: "#f3f4f6",
  disabledMonthBackground: "#e5e7eb",
  fontSize: {
    header: "4rem",
    subHeader: "3rem",
    title: "1rem",
    body: "0.875rem",
    footer: "0.75rem",
  },
  fontFamily: "monospace, Arial",
  colors: {
    monthTitleColor: "#6366f1",
    offDayColor: "#ef4444",
    hoverColor: "#6366f1",
  },
};

const PersianCalendar: React.FC<PersianCalendarProps> = ({
  theme = defaultTheme,
  mode = PersianCalendarMode.YEAR,
  className = "",
  year = getCurrentYear(),
  month = getCurrentMonthIndex(),
  events = [],
  offDates = [],
  offDaysOfWeek = [6],
  monthTitleFormat = "jMMMM",
  hasNavbar = true,
  hasModeSwitch = true,
  gridColumnCount = 4,
  onNext,
  onPrevious,
  onToday,
  onModeChange,
  onDayClick,
}) => {
  // Load moment with persian config
  moment.loadPersian({ dialect: "persian-modern", usePersianDigits: false });

  // Track the active mode
  const [activeMode, setActiveMode] = useState<PersianCalendarMode>(mode);

  // Track the active year
  const [jYear, setJYear] = useState<string>(year);

  // Track active month
  const [jMonth, setJMonth] = useState<number | undefined>(month);

  useEffect(() => {
    if (year !== jYear) {
      setJYear(year);
    }
  }, [year]);

  useEffect(() => {
    if (month !== jMonth) {
      setJMonth(month);
    }
  }, [month]);

  useEffect(() => {
    if (mode !== activeMode) {
      setActiveMode(mode);
    }
  }, [mode]);

  const currentMonths = useMemo(() => {
    return createYearMonth(
      jYear,
      events,
      offDates,
      offDaysOfWeek,
      monthTitleFormat
    );
  }, [jYear, events, offDates, offDaysOfWeek, monthTitleFormat]);

  const monthDays = useMemo(() => {
    if (!jMonth) return [];
    return createMonthDays(jYear, jMonth, events, offDates, offDaysOfWeek);
  }, [jYear, jMonth, events, offDates, offDaysOfWeek]);

  // Merge default theme with given theme as prop
  const mergedTheme: PersianCalendarTheme = { ...defaultTheme, ...theme };

  // Callbacks
  const _onNext = () => {
    if (onNext) {
      onNext();
      return;
    }

    if (activeMode === PersianCalendarMode.YEAR) {
      setJYear((prev) => String(Number(prev) + 1));
    } else {
      const month = jMonth ?? getCurrentMonthIndex();
      if (month + 1 > 12) {
        setJMonth(() => 1);
        setJYear((prev) => String(Number(prev) + 1));
      } else {
        setJMonth((prev) => Number(prev) + 1);
      }
    }
  };

  const _onPrevious = () => {
    if (onPrevious) {
      onPrevious();
      return;
    }

    if (activeMode === PersianCalendarMode.YEAR) {
      setJYear((prev) => String(Number(prev) - 1));
    } else {
      const month = jMonth ?? getCurrentMonthIndex();
      if (month - 1 < 1) {
        setJMonth(() => 12);
        setJYear((prev) => String(Number(prev) - 1));
      } else {
        setJMonth((prev) => Number(prev) - 1);
      }
    }
  };

  const _onToday = () => {
    if (onToday) {
      onToday();
      return;
    }

    setJYear(getCurrentYear());
    setJMonth(getCurrentMonthIndex());
  };

  const _onModeChange = (mode: PersianCalendarMode) => {
    if (onModeChange) {
      onModeChange(mode);
      return;
    }

    setActiveMode(mode);
    if (!jMonth) {
      setJMonth(getCurrentMonthIndex());
    }
  };

  return (
    <div
      dir="rtl"
      id="persian-calendar-container"
      className={cn("space-y-8 md:space-y-2", className)}
      style={{
        fontFamily: theme.fontFamily,
        background: theme.background,
      }}
    >
      {hasNavbar && (
        <Navbar
          year={toPersianDigits(jYear)}
          month={jMonth}
          theme={mergedTheme}
          mode={activeMode}
          hasModeSwitch={hasModeSwitch}
          onNext={_onNext}
          onPrevious={_onPrevious}
          onToday={_onToday}
          onModeChange={_onModeChange}
        />
      )}

      <div id="persian-calendar-main-content">
        {activeMode === PersianCalendarMode.YEAR ? (
          <YearView
            months={currentMonths}
            theme={mergedTheme}
            gridColumnCount={gridColumnCount}
            onDayClick={(day: Day) => onDayClick?.(day)}
          />
        ) : (
          <MonthView
            month={jMonth ?? getCurrentMonthIndex()}
            days={monthDays}
            theme={mergedTheme}
            onDayClick={(day: Day) => onDayClick?.(day)}
          />
        )}
      </div>
    </div>
  );
};

export default PersianCalendar;
