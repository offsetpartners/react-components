import React from "react";
import IconText from "./IconText";
import { render } from "react-dom";

// Allows for Component to mount via a normal DOM Classname
// Similar to jQuery
const iconTexts = document.getElementsByClassName("fig-icon-text");
if (iconTexts) {
  const arr = [...iconTexts];
  const validProps = IconText.validProps;
  let providedProps;
  if (typeof FigureReact !== "undefined" && FigureReact.IconText) {
    providedProps = FigureReact.IconText;
  }

  if (Array.isArray(providedProps) && providedProps.length !== arr.length) {
    throw new Error(
      "Each IconText Component must have a prop object assigned to it. You can also provide a single object to use across all Components."
    );
  }
  arr.forEach((element, index) => {
    let iconTextProps = {};

    try {
      validProps.forEach((prop) => {
        if (Array.isArray(providedProps)) {
          iconTextProps[prop] = providedProps[index][prop];
        } else {
          iconTextProps[prop] = providedProps[prop];
        }
      });
    } catch (e) {}

    if (element instanceof Element) {
      render(<IconText {...props} />, element);
    }
  });
}

// Also allows to be used within a React Application
IconText.displayName = "IconText";
export default IconText;
