import "./styles/index.css";
import { render } from "react-dom";
import { default as QueryBuilder } from "./QueryBuilder";

// Allows for Component to mount via a normal DOM Classname
// Similar to jQuery
const domElement = document.getElementById("fig-query-builder");
if (domElement) {
  let providedProps;
  const validProps = Object.keys(QueryBuilder.propTypes);
  if (typeof FigureReact !== "undefined" && FigureReact.QueryBuilder) {
    providedProps = FigureReact.QueryBuilder;
  }

  let queryBuilderProps = {};

  try {
    validProps.forEach((prop) => {
      queryBuilderProps[prop] = providedProps[prop];
    });
  } catch (e) {}

  if (domElement instanceof Element) {
    render(<QueryBuilder {...queryBuilderProps} />, domElement);
  }
}

// Also allows to be used within a React Application
QueryBuilder.displayName = "QueryBuilder";
export default QueryBuilder;
