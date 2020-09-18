import React from "react";
import { render } from "react-dom";
import ResultTable from "./ResultTable";

// Allows for Component to mount via a normal DOM Id
// Similary to jQuery libraries
const resultTables = document.getElementsByClassName("fig-result-table");
if (resultTables) {
  const arr = [...resultTables];
  arr.forEach((element, index) => {
    const type = element.getAttribute("data-type");
    const source = element.getAttribute("data-source");

    let parsed;
    try {
      parsed = JSON.parse(source);

      element.dataset.source = "";
    } catch (e) {
      parsed = [];
    }
    render(<ResultTable type={type} data={parsed} />, element);
  });
}

// Also allows to be used within a React Application
ResultTable.displayName = "ResultTable";
export default ResultTable;
