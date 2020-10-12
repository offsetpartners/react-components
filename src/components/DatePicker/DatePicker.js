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
  /**
   * @description Type of picker
   */
  type: PropTypes.oneOf(["single", "range"]),
  /**
   * @description Format of Date in Button
   */
  format: PropTypes.instanceOf(MomentFormatSpecification),

  /**
   * @description Initial Value to load
   */
  initialValue: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  ]),
  /**
   * @description value of DatePicker
   */
  value: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  ]),
  /**
   * @description Setter function for value state
   */
  setValue: PropTypes.func,
  /**
   * @description callback to when preset is selected or Calendar is closed
   */
  onSave: PropTypes.func,

  /**
   * Max Number of days for DateRange
   */
  maxDateRange: PropTypes.number,
  /**
   * Array of Keys that correspond to a preset item
   */
  disabledPresets: PropTypes.arrayOf(String),
};

DatePicker.validProps = Object.keys(DatePicker.propTypes);

export default DatePicker;
