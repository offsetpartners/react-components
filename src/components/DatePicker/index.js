import React from "react";
import { render } from "react-dom";
import DatePicker from "./DatePicker";

// Allows for Component to mount via a normal DOM Classname
// Similar to jQuery
const datepickers = document.getElementsByClassName("fig-datepicker");
if (datepickers) {
  const arr = [...datepickers];
  const validDataSets = ["format", "inputId", "initialValue"];
  const validProps = Object.keys(DatePicker.propTypes);
  let providedProps;
  if (typeof FigureReact !== "undefined" && FigureReact.DatePicker) {
    providedProps = FigureReact.DatePicker;
  }

  if (Array.isArray(providedProps) && providedProps.length !== arr.length) {
    throw new Error(
      "Each DatePicker Component must have a prop object assigned to it. You can also provide a single object to use across all Components."
    );
  }
  arr.forEach(
    /**
     * @param {Element} element
     * @param {Number} index
     */
    (element, index) => {
      let datepickerProps = {};

      try {
        validProps.forEach((prop) => {
          if (Array.isArray(providedProps)) {
            datepickerProps[prop] = providedProps[index][prop];
          } else {
            datepickerProps[prop] = providedProps[prop];
          }
        });

        const dataSets = element[0].dataset;
        validDataSets.forEach((prop) => {
          datepickerProps[prop] = dataSets[prop];
        });
      } catch (e) {}

      if (element instanceof Element) {
        render(<DatePicker {...datepickerProps} />, element);
      }
    }
  );
}

// Also allows to be used within a React Application
DatePicker.displayName = "DatePicker";
export default DatePicker;
