import React from "react";
import NavbarProps from "./props/NavbarProps";
import "./styles.css";
import { PersianCalendarMode } from "../../props";
import { getMonthName } from "../../lib/utils";

const Navbar: React.FC<NavbarProps> = ({
  year,
  month,
  theme,
  mode = PersianCalendarMode.YEAR,
  hasModeSwitch = true,
  onNext,
  onPrevious,
  onToday,
  onModeChange,
}) => {
  return (
    <div
      id="persian-calendar-navbar"
      className={`flex ${
        hasModeSwitch ? "flex-col" : "flex-row"
      } md:flex-row justify-between items-center md:items-center sticky top-0 z-50 h-fit space-y-2 pb-2 md:pb-0`}
      style={{ background: theme.background }}
    >
      {/* Year Title */}
      <p className="select-none self-start">
        {mode === PersianCalendarMode.YEAR ? (
          <span
            key={year}
            className="font-bold block animate-year-slide"
            style={{ fontSize: theme.fontSize!.header }}
          >
            {year}
          </span>
        ) : (
          <span className="flex justify-center items-center gap-2">
            {month && (
              <span
                key={month}
                className="font-bold block animate-year-slide"
                style={{ fontSize: theme.fontSize!.subHeader }}
              >
                {getMonthName(month)}
              </span>
            )}
            <span
              key={year}
              className="font-bold block animate-year-slide"
              style={{ fontSize: theme.fontSize!.subHeader }}
            >
              {year}
            </span>
          </span>
        )}
      </p>

      <div
        className={`flex ${
          hasModeSwitch ? "justify-between" : "justify-end"
        } gap-4 w-full md:w-fit`}
      >
        {/* Mode Change */}
        {hasModeSwitch && (
          <div
            className="relative flex gap-2 lg:gap-4 rounded-lg border"
            style={{
              borderColor: theme.textSecondary,
            }}
          >
            {/* Sliding background indicator */}
            <div
              className="absolute top-0 bottom-0 w-1/2 rounded-md transition-transform duration-300 ease-in-out"
              style={{
                backgroundColor: theme.primary,
                transform:
                  mode === PersianCalendarMode.YEAR
                    ? "translateX(0%)"
                    : "translateX(-100%)",
              }}
            />

            <p
              className="relative z-10 px-2 py-1 cursor-pointer w-10 text-center"
              style={{
                color:
                  mode === PersianCalendarMode.YEAR
                    ? "#fff"
                    : theme.textPrimary,
              }}
              onClick={() => onModeChange?.(PersianCalendarMode.YEAR)}
            >
              سال
            </p>
            <p
              className="relative z-10 px-2 py-1 cursor-pointer w-10 text-center"
              style={{
                color:
                  mode === PersianCalendarMode.MONTH
                    ? "#fff"
                    : theme.textPrimary,
              }}
              onClick={() => onModeChange?.(PersianCalendarMode.MONTH)}
            >
              ماه
            </p>
          </div>
        )}

        {/* Navigations */}
        <div className="flex items-center" dir="ltr">
          <svg
            onClick={() => onNext?.()}
            width={`${Number(theme.fontSize!.body!.replace("rem", "")) * 32}px`}
            height={`${
              Number(theme.fontSize!.body!.replace("rem", "")) * 32
            }px`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="cursor-pointer"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          <p
            onClick={() => onToday?.()}
            className="cursor-pointer select-none px-4 py-2 rounded-lg text-white font-bold"
            style={{
              fontSize: theme.fontSize?.body,
              background: theme.primary,
            }}
          >
            امروز
          </p>
          <svg
            onClick={() => onPrevious?.()}
            width={`${Number(theme.fontSize!.body!.replace("rem", "")) * 32}px`}
            height={`${
              Number(theme.fontSize!.body!.replace("rem", "")) * 32
            }px`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="cursor-pointer"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
