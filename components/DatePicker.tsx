"use client";

import React from "react";
import RecurrenceOptions from "./RecurrenceOptions";
import RecurrencePreview from "./RecurrencePreview";

const DatePicker: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md border border-gray-300 flex">
      <div className="flex-1 mr-4"> {/* Left column (RecurrenceOptions) */}
        <h2 className="text-3xl font-bold text-center mb-4 text-blue-600">
          Recurring Date Picker
        </h2>
        <RecurrenceOptions />
      </div>
      <div className="w-80"> {/* Right column (RecurrencePreview) */}
        <RecurrencePreview />
      </div>
    </div>
  );
};

export default DatePicker;