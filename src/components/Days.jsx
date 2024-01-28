import React from "react";
import { daysOfWeek } from "./constants";

const Days = () => {
  return (
    <div className="days-container">
      {daysOfWeek.map((day) => (
        <h4 key={day} className="day-text">
          {day}
        </h4>
      ))}
    </div>
  );
};

export default Days;
