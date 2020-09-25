import React from "react";
import "./styles/index.less";
import Calendar from "./Calendar";
import { render } from "react-dom";

// Allows for Component to mount via a normal DOM Classname
// Similar to jQuery
const calendars = document.getElementsByClassName("fig-calendar");
if (calendars) {
  const arr = [...calendars];
  arr.forEach((element, index) => {
    let calendarProps = {};

    const validProps = [
      "selected",
      "setSelected",
      "month",
      "setMonth",
      "year",
      "setYear",

      // Data fetching Props
      "onCellClick",
      "onDateChange",
      "doesCellHaveEvent",

      // UI Props
      "daysLabelType",
      "headerComponents",
    ];

    try {
      if (FigureReact && FigureReact.Calendar) {
        const { Calendar } = FigureReact;
        validProps.map((prop) => {
          if (Calendar[prop]) {
            calendarProps[prop] = Calendar[prop];
          }
        });
      }
    } catch (e) {}

    if (element instanceof Element) {
      render(<Calendar {...calendarProps} />, element);
    }
  });
}

// Also allows to be used within a React Application
Calendar.displayName = "Calendar";
export default Calendar;
