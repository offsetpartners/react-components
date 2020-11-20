// If FigureReact isn't defined then default to an empty object
if (typeof FigureReact === "undefined") {
  window.FigureReact = {};
}

import common from "./common";
import * as Components from "./components";

FigureReact.common = common;
FigureReact.Components = Components;

export { default as common } from "./common";
export * from "./components";
