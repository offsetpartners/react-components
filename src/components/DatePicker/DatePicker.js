import React from "react";
import "./styles/index.less";
import propTypes from "./propTypes";
import Button from "./components/Button";
import Popover from "./components/Popover";
import DatePickerProvider from "./provider";

const DatePicker = (props) => {
  return (
    <DatePickerProvider {...props}>
      <Popover>
        <Button />
      </Popover>
    </DatePickerProvider>
  );
};

DatePicker.propTypes = propTypes;
DatePicker.displayName = "DatePicker";

export default DatePicker;
