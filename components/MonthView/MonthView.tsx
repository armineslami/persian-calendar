import React from "react";
import MonthViewProps from "./props/MonthViewProps";
import { PersianCalendarEvent } from "../../props";

const MonthView: React.FC<MonthViewProps> = ({
  month,
  days,
  theme,
  onDayClick,
}) => {
  const dayTitles = [
    { id: "1", title: "شنبه" },
    { id: "2", title: "یکشنبه" },
    { id: "3", title: "دوشنبه" },
    { id: "4", title: "سه‌شنبه" },
    { id: "5", title: "چهارشنبه" },
    { id: "6", title: "پنجشنبه" },
    { id: "7", title: "جمعه" },
  ];

  return (
    <div className="overflow-x-auto">
      <div
        id="persian-calendar-month-view-container"
        className="persian-calendar grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 min-w-full min-h-dvh"
      >
        {/* Days  */}
        {days.map((day, index) => (
          <div
            key={index}
            className="border p-4 min-w-32 min-h-32"
            style={{
              borderColor: theme.borderColor,
              fontSize: theme.fontSize?.body,
              background:
                month !== day.month ? theme.disabledMonthBackground : undefined,
              cursor: month === day.month ? "pointer" : "not-allowed",
            }}
            onClick={() => month === day.month && onDayClick?.(day)}
          >
            <div className="text-start space-y-4 select-none">
              {/* Day Title and date */}
              <p
                className="truncate flex justify-between items-center"
                style={{
                  fontSize: theme.fontSize?.body,
                  color: theme.textSecondary,
                }}
              >
                <span>{dayTitles[(days.length + index) % 7].title}</span>
                <span
                  className="flex items-center justify-center rounded-full aspect-square w-full max-w-[40px] "
                  style={{
                    backgroundColor: day.active ? theme.primary : undefined,
                    color: day.active ? "#fff" : theme.textSecondary,
                  }}
                >
                  {day.title}
                </span>
              </p>

              {/* Event */}
              <div
                style={{
                  fontSize: theme.fontSize?.body,
                  color: theme.textPrimary,
                }}
                className="flex flex-col gap-1 text-wrap overflow-auto"
              >
                {day.event?.map((event: PersianCalendarEvent) => (
                  <p
                    key={Math.random() * (event.id ?? Math.random())}
                    className="truncate text-white px-1 py-0.5 rounded-sm w-full"
                    style={{
                      background: event.color ?? theme.accent,
                      fontSize: theme.fontSize?.footer,
                    }}
                  >
                    {event.title}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthView;
