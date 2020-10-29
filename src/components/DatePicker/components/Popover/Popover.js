import { Popover } from "antd";
import SingleInput from "./SingleInput";
import RangeInputs from "./RangeInputs";
import { useDatePicker } from "components/DatePicker/provider";

export default ({ children }) => {
  const { type, value, disabled, onSave } = useDatePicker();
  let Content;

  if (type === "range") {
    Content = <RangeInputs />;
  } else {
    Content = <SingleInput />;
  }
  return (
    <Popover
      content={Content}
      trigger={disabled ? [] : "click"}
      overlayClassName="fig-datepicker-calendar-popover"
      getTooltipContainer={(n) =>
        document.querySelector(".fig-datepicker-calendar-col")
      }
      onVisibleChange={(visible) => !disabled && !visible && onSave(value)}
    >
      {children}
    </Popover>
  );
};
