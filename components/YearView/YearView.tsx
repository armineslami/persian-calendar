import React from "react";
import YearViewProps from "./props/YearViewProps";
import { cn } from "../../lib/utils";
import { Day } from "../../props";

const YearView: React.FC<YearViewProps> = ({
  months,
  theme,
  gridColumnCount,
  onDayClick,
}) => {
  const dayTitles = [
    { id: "1", title: "ش" },
    { id: "2", title: "ی" },
    { id: "3", title: "د" },
    { id: "4", title: "س" },
    { id: "5", title: "چ" },
    { id: "6", title: "پ" },
    { id: "7", title: "ج" },
  ];

  function getGridColsClass(count: number) {
    return (
      {
        1: "md:grid-cols-1",
        2: "md:grid-cols-2",
        3: "md:grid-cols-3",
        4: "md:grid-cols-4",
        5: "md:grid-cols-5",
        6: "md:grid-cols-6",
        7: "md:grid-cols-7",
        8: "md:grid-cols-8",
        9: "md:grid-cols-9",
        10: "md:grid-cols-10",
        11: "md:grid-cols-11",
        12: "md:grid-cols-12",
      }[count] ?? "md:grid-cols-3"
    );
  }

  return (
    <div
      id="persian-calendar-year-view-container"
      className={cn(
        "persian-calendar grid grid-cols-1",
        getGridColsClass(gridColumnCount),
        " gap-6"
      )}
    >
      {months.map((month, index) => (
        <div className="space-y-2" key={month.id * index * Math.random()}>
          <div
            className="month-row-text font-bold select-none"
            style={{
              color: theme.colors!.monthTitleColor,
              fontSize: theme.fontSize!.title,
            }}
          >
            {month.title}
          </div>
          <div
            className="grid grid-cols-7 gap-2"
            style={{ color: theme.textPrimary, fontSize: theme.fontSize!.body }}
          >
            {/* Day titles */}
            {dayTitles.map((title) => (
              <div
                className="flex items-center justify-center aspect-square w-full max-w-[40px] cursor-default select-none"
                key={title.id}
              >
                {title.title}
              </div>
            ))}

            {/* Day numbers */}
            {month.days.map((day: Day, index: number) => {
              return (
                <div
                  key={day.id + index * Math.random()}
                  className={cn(
                    "relative flex items-center justify-center font-bold rounded-full aspect-square w-full max-w-[40px] select-none",
                    "month-row-text",
                    day.enabled && "month-row-text-hover cursor-pointer"
                  )}
                  style={
                    {
                      "--hover-bg": theme.colors!.hoverColor,
                      "--text": day.active
                        ? "#fff"
                        : day.isOffDay
                        ? theme.colors!.offDayColor
                        : theme.textPrimary,
                      backgroundColor: day.active ? theme.primary : undefined,
                      fontSize: theme.fontSize!.body,
                    } as React.CSSProperties
                  }
                  onClick={() => onDayClick?.(day)}
                >
                  {day.title}
                  {day.event && day.event.length !== 0 && (
                    <span
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                      style={{
                        background:
                          day.event.length > 1
                            ? theme.accent
                            : day.event[0].color,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default YearView;
