import Popover from "antd/lib/popover";
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
      onVisibleChange={(visible) => !disabled && !visible && onSave(value)}
    >
      {children}
    </Popover>
  );
};
