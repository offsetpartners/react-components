import { render } from "react-dom";
import "./styles/index.less";
import Filter from "./Filter";

// Allows for Component to mount via a normal DOM Classname
// Similar to jQuery
const filters = document.getElementsByClassName("fig-filter-box");
if (filters) {
  const arr = [...filters];
  const validProps = Object.keys(Filter.propTypes);
  let providedProps;
  if (typeof FigureReact !== "undefined" && FigureReact.Filter) {
    providedProps = FigureReact.Filter;
  }

  if (Array.isArray(providedProps) && providedProps.length !== arr.length) {
    throw new Error(
      "Each Filter Component must have a prop object assigned to it. You can also provide a single object to use across all Components."
    );
  }
  arr.forEach((element, index) => {
    let filterProps = {};

    try {
      validProps.forEach((prop) => {
        if (Array.isArray(providedProps)) {
          filterProps[prop] = providedProps[index][prop];
        } else {
          filterProps[prop] = providedProps[prop];
        }
      });
    } catch (e) {}

    if (element instanceof Element) {
      render(<Filter {...filterProps} />, element);
    }
  });
}

export default Filter;
