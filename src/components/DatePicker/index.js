import moment from "moment";
import { render } from "react-dom";
import DatePicker from "./DatePicker";

// Allows for Component to mount via a normal DOM Classname
// Similar to jQuery
const datepickers = document.getElementsByClassName("fig-datepicker");
if (datepickers) {
  const arr = [...datepickers];
  const validDataSets = ["type", "format", "inputId", "initialValue"];
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

        const dataSets = element.dataset;
        validDataSets.forEach((prop) => {
          switch (prop) {
            case "inputId":
              try {
                const parsed = JSON.parse(dataSets[prop]);
                if (Array.isArray(parsed) && parsed.length === 2) {
                  datepickerProps[prop] = parsed;
                }
              } catch (e) {}
              datepickerProps[prop] = dataSets[prop];
              return;
            case "initialValue":
              if (!dataSets["initialValueFormat"]) return;

              const initialValueFormat = dataSets["initialValueFormat"];
              let initialValue;

              if (moment(dataSets[prop], initialValueFormat).isValid()) {
                initialValue = moment(
                  dataSets[prop],
                  initialValueFormat
                ).toDate();
              }

              try {
                const parsed = JSON.parse(dataSets[prop]);
                if (Array.isArray(parsed) && parsed.length === 2) {
                  const from = moment(parsed[0], initialValueFormat);
                  const to = moment(parsed[1], initialValueFormat);

                  if (from.isAfter(to) || to.isBefore(from)) {
                    initialValue = [to.toDate(), from.toDate()];
                  } else {
                    initialValue = [from.toDate(), to.toDate()];
                  }
                  datepickerProps["type"] = "range";
                }
              } catch (e) {}

              if (!Array.isArray(initialValue)) {
                datepickerProps["type"] = "single";
              }
              datepickerProps[prop] = initialValue;
              return;
            default:
              datepickerProps[prop] ||= dataSets[prop];
          }
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
