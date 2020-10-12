import React from "react";
import { render } from "react-dom";
import DatePicker from "./DatePicker";

// Allows for Component to mount via a normal DOM Classname
// Similar to jQuery
const datepickers = document.getElementsByClassName("fig-datepicker");
if (datepickers) {
  const arr = [...datepickers];
  const validProps = DatePicker.validProps;
  let providedProps;
  if (typeof FigureReact !== "undefined" && FigureReact.DatePicker) {
    providedProps = FigureReact.DatePicker;
  }

  if (Array.isArray(providedProps) && providedProps.length !== arr.length) {
    throw new Error(
      "Each DatePicker Component must have a prop object assigned to it. You can also provide a single object to use across all Components."
    );
  }
  arr.forEach((element, index) => {
    let datepickerProps = {};

    try {
      validProps.forEach((prop) => {
        if (Array.isArray(providedProps)) {
          datepickerProps[prop] = providedProps[index][prop];
        } else {
          datepickerProps[prop] = providedProps[prop];
        }
      });
    } catch (e) {}

    if (element instanceof Element) {
      render(<DatePicker {...datepickerProps} />, element);
    }
  });
}

// Also allows to be used within a React Application
DatePicker.displayName = "DatePicker";
export default DatePicker;
