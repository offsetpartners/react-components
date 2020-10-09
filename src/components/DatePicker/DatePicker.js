import React from "react";
import "./styles/index.less";
import DatePickerProvider from "./provider";
import Button from "./components/Button";
import Popover from "./components/Popover";

const DatePicker = (props) => {
  return (
    <DatePickerProvider {...props}>
      <Popover>
        <Button />
      </Popover>
    </DatePickerProvider>
  );
};

export default DatePicker;
