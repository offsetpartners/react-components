import React from "react";
import Calendar from "./Calendar";
import { render } from "react-dom";

// Allows for Component to mount via a normal DOM Id
// Similary to jQuery libraries
const calendars = document.getElementsByClassName("fig-calendar");
if (calendars) {
  const arr = [...calendars];
  arr.forEach((element, index) => {
    render(<Calendar />, element);
  });
}

// Also allows to be used within a React Application
Calendar.displayName = "Calendar";
export default Calendar;
