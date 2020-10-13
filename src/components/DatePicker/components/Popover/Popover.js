import React from "react";
import { Popover } from "antd";
import SingleInput from "./SingleInput";
import RangeInputs from "./RangeInputs";
import { useDatePicker } from "components/DatePicker/provider";

export default ({ children }) => {
  const { type, value, onSave } = useDatePicker();
  let Content;

  if (type === "range") {
    Content = <RangeInputs />;
  } else {
    Content = <SingleInput />;
  }
  return (
    <Popover
      trigger="click"
      content={Content}
      overlayClassName="fig-datepicker-calendar-popover"
      getTooltipContainer={(n) =>
        document.querySelector(".fig-datepicker-calendar-col")
      }
      onVisibleChange={(visible) => !visible && onSave(value)}
    >
      {children}
    </Popover>
  );
};
