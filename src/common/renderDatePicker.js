import moment from "moment";
import { render } from "react-dom";
import DatePicker from "./DatePicker";

export default () => {
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

    // If nothing was provided then just default to an empty Object
    providedProps ||= {};

    arr.forEach(
      /**
       * @param {Element} element
       * @param {Number} index
       */
      (element, index) => {
        let datepickerProps = {};

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
                  break;
                }
              } catch (e) {}
              datepickerProps[prop] = dataSets[prop];
              break;
            case "initialValue":
              if (dataSets["initialValue"] && !dataSets["initialValueFormat"]) {
                throw new Error(
                  "You must specify an initialValueFormat(data-initial-value-format) if you're passing an initial value!"
                );
              }

              // If already set then just skip
              if (datepickerProps[prop]) {
                return;
              }

              const initialValueFormat = dataSets["initialValueFormat"];
              let initialValue;

              if (moment(dataSets[prop], initialValueFormat).isValid()) {
                initialValue = moment(
                  dataSets[prop],
                  initialValueFormat
                ).toDate();
              }

              try {
                // Check if an array was provided for initialValue
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
              break;
            default:
              // Ensure that we're not just unsetting
              // this particular prop
              if (dataSets[prop]) {
                datepickerProps[prop] ||= dataSets[prop];
              }
          }
        });

        if (element instanceof Element) {
          render(<DatePicker {...datepickerProps} />, element);
        }
      }
    );
  }
};
