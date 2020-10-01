import React from "react";
import { render } from "react-dom";
import ResultTable from "./ResultTable";

// Allows for Component to mount via a normal DOM Classname
// Similar to jQuery
const resultTables = document.getElementsByClassName("fig-result-table");
if (resultTables) {
  const arr = [...resultTables];
  arr.forEach((element, index) => {
    let tableProps = {};

    const validProps = ["type", "data", "onSelect"];

    try {
      if (FigureReact && FigureReact.ResultTable) {
        const { ResultTable } = FigureReact;
        validProps.map((prop) => {
          if (ResultTable[prop]) {
            tableProps[prop] = ResultTable[prop];
          }
        });
      }
    } catch (e) {}

    if (element instanceof Element) {
      render(<ResultTable {...tableProps} />, element);
    }
  });
}

// Also allows to be used within a React Application
ResultTable.displayName = "ResultTable";
export default ResultTable;
