import moment from "moment";
import { render } from "react-dom";
import TimePicker from "./TimePicker";

// Allows for Component to mount via a normal DOM Classname
// Similar to jQuery
const timepickers = document.getElementsByClassName("fig-timepicker");
if (timepickers) {
  const arr = [...timepickers];
  const validProps = [
    "type",
    "format",
    "inputId",
    "onSave",
    "initialValue",
    "initialValueFormat",
  ];
  let providedProps;
  if (typeof FigureReact !== "undefined" && FigureReact.TimePicker) {
    providedProps = FigureReact.TimePicker;
  }

  if (Array.isArray(providedProps) && providedProps.length !== arr.length) {
    throw new Error(
      "Each TimePicker Component must have a prop object assigned to it. You can also provide a single object to use across all Components."
    );
  }

  // If nothing was provided then just default to an empty Object
  providedProps ||= {};

  arr.forEach(
    /**
     * @param {Element} element
     * @param {Number} index
     */
    (element, index) => {
      let timepickerProps = {};

      validProps.forEach((prop) => {
        if (Array.isArray(providedProps)) {
          timepickerProps[prop] = providedProps[index][prop];
        } else {
          timepickerProps[prop] = providedProps[prop];
        }
      });

      const dataSets = element.dataset;
      validProps.forEach((prop) => {
        switch (prop) {
          case "inputId":
            try {
              const parsed = JSON.parse(dataSets[prop]);
              if (Array.isArray(parsed) && parsed.length === 2) {
                timepickerProps[prop] = parsed;
                break;
              }
            } catch (e) {}
            timepickerProps[prop] = dataSets[prop];
            break;
          case "initialValue":
            if (dataSets["initialValue"] && !dataSets["initialValueFormat"]) {
              throw new Error(
                "You must specify an initialValueFormat(data-initial-value-format) if you're passing an initial value!"
              );
            }

            const initialValueFormat = dataSets["initialValueFormat"];
            let initialValue;

            if (moment(dataSets[prop], initialValueFormat).isValid()) {
              initialValue = moment(dataSets[prop], initialValueFormat);
            }

            try {
              // Check if an array was provided for initialValue
              const parsed = JSON.parse(dataSets[prop]);
              if (Array.isArray(parsed)) {
                const from = moment(parsed[0], initialValueFormat);
                const to =
                  parsed.length === 2
                    ? moment(parsed[1], initialValueFormat)
                    : moment(null, initialValueFormat);

                if (from.isAfter(to) || to.isBefore(from)) {
                  initialValue = [to, from];
                } else {
                  initialValue = [from, to];
                }

                timepickerProps["type"] = "range";
                break;
              }
            } catch (e) {}

            if (!Array.isArray(initialValue)) {
              timepickerProps["type"] = "single";
            }
            timepickerProps[prop] = initialValue;
            break;
          default:
            timepickerProps[prop] ||= dataSets[prop];
        }
      });

      if (element instanceof Element) {
        render(<TimePicker {...timepickerProps} />, element);
      }
    }
  );
}

// Also allows to be used within a React Application
TimePicker.displayName = "TimePicker";
export default TimePicker;
