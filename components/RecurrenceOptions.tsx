import React from "react";
import { useDatePicker } from "../context/DatePickerContext";

// Define types for recurrence
type RecurrenceType = "daily" | "weekly" | "monthly" | "yearly";
type RecurrenceEndType = "endless" | "endByDate";

const RecurrenceOptions: React.FC = () => {
  const {
    recurrenceType,
    setRecurrenceType,
    startDate,
    setStartDate,
    specificDays,
    setSpecificDays,
    nthDay,
    setNthDay,
    generatePreviewDates,
    resetFields,
    recurrenceEndType,
    setRecurrenceEndType,
    every,
    setEvery,
    endDate,
    setEndDate,
  } = useDatePicker();

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Recurrence Options
      </h2>

      {/* Recurrence Type Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Recurrence Type:
        </label>
        <select
          value={recurrenceType}
          onChange={(e) => setRecurrenceType(e.target.value as RecurrenceType)} // Use RecurrenceType
          className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* Every Input for Daily Recurrence */}
      {recurrenceType === "daily" && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Every: (for every X days)
          </label>
          <input
            type="number"
            value={every}
            min={1}
            onChange={(e) => setEvery(Number(e.target.value))}
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1"
            placeholder="Enter number of days"
          />
        </div>
      )}

      {/* Weekly Specific Days */}
      {recurrenceType === "weekly" && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Specific Day of the Week:
          </label>

          <div className="grid grid-cols-3 gap-2">
            {daysOfWeek.map((day, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="checkbox"
                  value={index}
                  checked={specificDays.includes(index)}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setSpecificDays([value]); // Allow only one day to be selected
                  }}
                  className="mr-2"
                />
                {day}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Monthly nth Day */}
      {recurrenceType === "monthly" && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            The nth day of the month:
          </label>
          <select
            value={nthDay}
            onChange={(e) => setNthDay(Number(e.target.value))}
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1"
          >
            {Array.from({ length: 31 }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Start Date */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Start Date:
        </label>
        <input
          type="date"
          value={startDate ? startDate.toISOString().split("T")[0] : ""}
          onChange={(e) => setStartDate(new Date(e.target.value))}
          className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1"
        />
      </div>

      {/* Recurrence End Type Radio Buttons */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Recurrence End:
        </label>
        <div className="flex items-center mt-1">
          <label className="mr-4">
            <input
              type="radio"
              value="endless"
              checked={recurrenceEndType === "endless"}
              onChange={() => setRecurrenceEndType("endless")}
              className="mr-2"
            />
            Endless
          </label>
          <label>
            <input
              type="radio"
              value="endByDate"
              checked={recurrenceEndType === "endByDate"}
              onChange={() => setRecurrenceEndType("endByDate")}
              className="mr-2"
            />
            End By Date:
          </label>
        </div>
      </div>

      {/* End Date (Optional, shown only if End by Date is selected) */}
      {recurrenceEndType === "endByDate" && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            End Date (Optional):
          </label>
          <input
            type="date"
            value={endDate ? endDate.toISOString().split("T")[0] : ""}
            onChange={(e) => setEndDate(new Date(e.target.value))}
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1"
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={generatePreviewDates}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Apply
        </button>
        <button
          onClick={resetFields}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default RecurrenceOptions;
