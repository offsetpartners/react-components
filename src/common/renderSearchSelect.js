import { render } from "react-dom";
import SearchSelect from "components/SearchSelect/SearchSelect";

export default () => {
  // Allows for Component to mount via a normal DOM Classname
  // Similar to jQuery
  const searchSelects = document.getElementsByClassName("fig-search-select");
  if (searchSelects) {
    const arr = [...searchSelects];
    const validDataSets = [
      "inputId",
      "options",
      "multiple",
      "disabled",
      "className",
      "placeholder",
      "initialValue",
    ];
    const validProps = [...validDataSets, "onSetValue"];
    let providedProps;
    if (typeof FigureReact !== "undefined" && FigureReact.SearchSelect) {
      providedProps = FigureReact.SearchSelect;
    }

    if (Array.isArray(providedProps) && providedProps.length !== arr.length) {
      throw new Error(
        "Each SearchSelect Component must have a prop object assigned to it. You can also provide a single object to use across all Components."
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
        let searchSelectProps = {};

        validProps.forEach((prop) => {
          if (Array.isArray(providedProps)) {
            searchSelectProps[prop] = providedProps[index][prop];
          } else {
            searchSelectProps[prop] = providedProps[prop];
          }
        });

        const dataSets = element.dataset;
        validDataSets.forEach((prop) => {
          switch (prop) {
            case "inputId":
              searchSelectProps[prop] = dataSets[prop];
              break;
            case "options":
              try {
                const options = dataSets[prop];
                if (
                  typeof options === "string" ||
                  typeof options === "object"
                ) {
                  const parsed = JSON.parse(options);
                  if (Array.isArray(parsed)) {
                    searchSelectProps[prop] = parsed;
                  }
                } else if (Array.isArray(options)) {
                  searchSelectProps[prop] = options;
                }
              } catch (e) {}
              break;
            default:
              // Ensure that we're not just unsetting
              // this particular prop
              if (dataSets[prop]) {
                searchSelectProps[prop] ||= dataSets[prop];
              }
          }
        });

        if (element instanceof Element) {
          render(<SearchSelect {...searchSelectProps} />, element);
        }
      }
    );
  }
};
