import React from "react";
import { render } from "react-dom";
import propTypes from "./propTypes";
import ResultTable from "./ResultTable";

// Allows for Component to mount via a normal DOM Classname
// Similar to jQuery
const resultTables = document.getElementsByClassName("fig-result-table");
if (resultTables) {
  const arr = [...resultTables];
  const validProps = Object.keys(propTypes);
  let providedProps;
  if (typeof FigureReact !== "undefined" && FigureReact.ResultTable) {
    providedProps = FigureReact.ResultTable;
  }

  if (Array.isArray(providedProps) && providedProps.length !== arr.length) {
    throw new Error(
      "Each ResultTable Component must have a prop object assigned to it. You can also provide a single object to use across all Components."
    );
  }
  arr.forEach((element, index) => {
    let tableProps = {};

    try {
      validProps.forEach((prop) => {
        if (Array.isArray(providedProps)) {
          tableProps[prop] = providedProps[index][prop];
        } else {
          tableProps[prop] = providedProps[prop];
        }
      });
    } catch (e) {}

    if (element instanceof Element) {
      render(<ResultTable {...tableProps} />, element);
    }
  });
}

// Also allows to be used within a React Application
ResultTable.displayName = "ResultTable";
export default ResultTable;
