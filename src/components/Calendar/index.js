import "./styles/index.less";
import Calendar from "./Calendar";
import { render } from "react-dom";

// Allows for Component to mount via a normal DOM Classname
// Similar to jQuery
const calendars = document.getElementsByClassName("fig-calendar");
if (calendars) {
  const arr = [...calendars];
  const validProps = Object.keys(Calendar.propTypes);
  let providedProps;
  if (typeof FigureReact !== "undefined" && FigureReact.Calendar) {
    providedProps = FigureReact.Calendar;
  }

  if (Array.isArray(providedProps) && providedProps.length !== arr.length) {
    throw new Error(
      "Each Calendar Component must have a prop object assigned to it. You can also provide a single object to use across all Components."
    );
  }
  arr.forEach((element, index) => {
    let calendarProps = {};

    try {
      validProps.forEach((prop) => {
        if (Array.isArray(providedProps)) {
          calendarProps[prop] = providedProps[index][prop];
        } else {
          calendarProps[prop] = providedProps[prop];
        }
      });
    } catch (e) {}

    if (element instanceof Element) {
      render(<Calendar {...calendarProps} />, element);
    }
  });
}

export default Calendar;
