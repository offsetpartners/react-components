import React from "react";
import { render } from "react-dom";
import { default as IconText } from "./IconText";

// Allows for Component to mount via a normal DOM Classname
// Similar to jQuery
const iconTexts = document.getElementsByClassName("fig-icon-text");
if (iconTexts) {
  const arr = [...iconTexts];
  arr.forEach((element, index) => {
    let props = {};

    const validProps = [
      "text",
      "size",
      "icon",
      "align",
      "spacing",
      "variant",
      "iconProps",
      "iconPlacement",
    ];

    try {
      if (FigureReact && FigureReact.IconText) {
        const { IconText } = FigureReact;
        validProps.map((prop) => {
          if (IconText[prop]) {
            props[prop] = IconText[prop];
          }
        });
      }
    } catch (e) {}

    if (element instanceof Element) {
      render(<IconText {...props} />, element);
    }
  });
}

// Also allows to be used within a React Application
IconText.displayName = "IconText";
export default IconText;
