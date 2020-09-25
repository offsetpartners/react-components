import React from "react";
import "./styles/index.css";
import { render } from "react-dom";
import { default as QueryBuilder } from "./QueryBuilder";

// Allows for Component to mount via a normal DOM Classname
// Similar to jQuery
const domElement = document.getElementById("fig-query-builder");
if (domElement) {
  if (domElement instanceof Element) {
    render(<QueryBuilder />, domElement);
  }
}

// Also allows to be used within a React Application
QueryBuilder.displayName = "QueryBuilder";
export default QueryBuilder;
