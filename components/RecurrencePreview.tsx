import React from "react";
import Calendar from "react-calendar"
import { useDatePicker } from "../context/DatePickerContext";
// import moment from "moment";
import "react-calendar/dist/Calendar.css";

const RecurrencePreview: React.FC = () => {
  const { previewDates } = useDatePicker();

  // Convert preview dates to Date objects
  const highlightedDates = previewDates.map(date => new Date(date));

  // Function to determine if a date is highlighted
  const isHighlighted = (date: Date) =>
    highlightedDates.some(
      (highlightedDate) => highlightedDate.getTime() === date.getTime()
    );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Recurrence Preview
      </h2>
      <Calendar
        tileClassName={({ date }) =>
          isHighlighted(date) ? "highlight" : ""
        }
        tileDisabled={({ date }) => date.getDay() === 0}
        minDate={new Date()}
      />
    </div>
  );
};

export default RecurrencePreview;