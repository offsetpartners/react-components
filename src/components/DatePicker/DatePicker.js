import React from "react";
import "./styles/index.less";
import PropTypes from "prop-types";
import Button from "./components/Button";
import Popover from "./components/Popover";
import DatePickerProvider from "./provider";
import { MomentFormatSpecification } from "moment";

const DatePicker = (props) => {
  return (
    <DatePickerProvider {...props}>
      <Popover>
        <Button />
      </Popover>
    </DatePickerProvider>
  );
};

DatePicker.propTypes = {
  type: PropTypes.oneOf(["single", "range"]),
  format: PropTypes.instanceOf(MomentFormatSpecification),

  value: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.arrayOf(Date),
  ]),
  setValue: PropTypes.func,
  onSave: PropTypes.func,

  disabledPresets: PropTypes.arrayOf(String),
};

export default DatePicker;
