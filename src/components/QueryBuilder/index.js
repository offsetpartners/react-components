import React from "react";
import { render } from "react-dom";
import QueryBuilder from "./QueryBuilder";

// Allows for Component to mount via a normal DOM Id
// Similary to jQuery libraries
const queryBuilder = document.getElementById("fig-query-builder");
if (queryBuilder) render(<QueryBuilder />, queryBuilder);

// Also allows to be used within a React Application
QueryBuilder.displayName = "QueryBuilder";
export default QueryBuilder;
