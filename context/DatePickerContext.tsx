"use client";
import React, { createContext, useContext, useState } from "react";
import { addDays, addMonths, addYears, format } from "date-fns";

interface DatePickerContextProps {
  recurrenceType: "daily" | "weekly" | "monthly" | "yearly";
  setRecurrenceType: (type: "daily" | "weekly" | "monthly" | "yearly") => void;
  every: number;
  setEvery: (every: number) => void;
  startDate: Date | null;
  setStartDate: (date: Date) => void;
  endDate: Date | null;
  setEndDate: (date: Date) => void;
  specificDays: number[];
  setSpecificDays: (days: number[]) => void;
  nthDay: number;
  setNthDay: (nth: number) => void;
  previewDates: string[];
  generatePreviewDates: () => void;
  resetFields: () => void;
  recurrenceEndType: "endless" | "endByDate";
  setRecurrenceEndType: (type: "endless" | "endByDate") => void;

}

const DatePickerContext = createContext<DatePickerContextProps | undefined>(
  undefined
);

export const DatePickerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [recurrenceType, setRecurrenceType] = useState<
    "daily" | "weekly" | "monthly" | "yearly"
  >("daily");
  const [every, setEvery] = useState(1);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [specificDays, setSpecificDays] = useState<number[]>([]);
  const [nthDay, setNthDay] = useState(1);
  const [previewDates, setPreviewDates] = useState<string[]>([]);
  const [recurrenceEndType, setRecurrenceEndType] = useState<"endless" | "endByDate">("endless");


  const generatePreviewDates = () => {
    if (!startDate) return;
    let currentDate = new Date(startDate); // Start from the selected start date
    const dates: string[] = [];

    // Set a limit for endless recurrence (2 years from start date)
    const endDateForEndless = new Date(startDate);
    endDateForEndless.setFullYear(endDateForEndless.getFullYear() + 2);

    while (
      recurrenceEndType === "endless" ||
      (endDate && currentDate <= endDate)
    ) {
      switch (recurrenceType) {
        case "daily":
          dates.push(format(currentDate, "MMM d, yyyy"));
          currentDate = addDays(currentDate, every); // Use the "Every" interval for daily recurrence
          break;

        case "weekly":
          if (specificDays.includes(currentDate.getDay())) {
            dates.push(format(currentDate, "MMM d, yyyy"));
          }
          currentDate = addDays(currentDate, 1); // Move to the next day
          break;

        case "monthly":
          // Check if nthDay exists in the current month
          const maxDaysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
          if (nthDay <= maxDaysInMonth) {
            currentDate.setDate(nthDay); // Set to the nth day of the current month
            dates.push(format(currentDate, "MMM d, yyyy"));
          } else {
            currentDate.setDate(maxDaysInMonth); // Set to the last day of the month if nthDay exceeds
          }
          currentDate = addMonths(currentDate, 1); // Move to the next month
          break;

        case "yearly":
          dates.push(format(currentDate, "MMM d, yyyy"));
          currentDate = addYears(currentDate, 1); // Increment by 1 year
          break;

        default:
          break;
      }

      // Stop generating if we exceed the limit for endless recurrence
      if (recurrenceEndType === "endless" && currentDate > endDateForEndless) {
        break;
      }
    }

    setPreviewDates(dates);
    console.log("Generated Dates:", dates);
  };






  const resetFields = () => {
    setRecurrenceType("daily");
    setEvery(1);
    setStartDate(null);
    setEndDate(null);
    setSpecificDays([]);
    setNthDay(1);
    setPreviewDates([]);
  };

  return (
    <DatePickerContext.Provider
      value={{
        recurrenceType,
        setRecurrenceType,
        every,
        setEvery,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        specificDays,
        setSpecificDays,
        nthDay,
        setNthDay,
        previewDates,
        generatePreviewDates,
        resetFields,
        recurrenceEndType,
        setRecurrenceEndType, // add this line
      }}
    >
      {children}
    </DatePickerContext.Provider>
  );
};

export const useDatePicker = () => {
  const context = useContext(DatePickerContext);
  if (!context) {
    throw new Error("useDatePicker must be used within a DatePickerProvider");
  }
  return context;
};