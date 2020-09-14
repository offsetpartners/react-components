import React from "react";
import { render } from "react-dom";
import ResultTable from "./ResultTable";

// Allows for Component to mount via a normal DOM Id
// Similary to jQuery libraries
const resultTable = document.getElementsByClassName("fig-result-table");
if (resultTable) {
  const arr = [...resultTable];
  arr.forEach((element, index) => {
    render(<ResultTable />, element);
  });
}

// Also allows to be used within a React Application
ResultTable.displayName = "ResultTable";
export default ResultTable;
