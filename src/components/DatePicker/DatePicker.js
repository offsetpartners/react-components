import "./styles/index.less";
import PropTypes from "prop-types";
import { memo } from "react";
import Button from "./components/Button";
import Popover from "./components/Popover";
import DatePickerProvider from "./provider";
import { MomentFormatSpecification } from "moment";

const DatePicker = memo((props) => {
  return (
    <DatePickerProvider {...props}>
      <Popover>
        <Button />
      </Popover>
    </DatePickerProvider>
  );
});

DatePicker.displayName = "DatePicker";
DatePicker.propTypes = {
  /**
   * Input Id
   */
  inputId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  /**
   * Disables Component
   */
  disabled: PropTypes.bool,
  /**
   * Type of picker
   */
  type: PropTypes.oneOf(["single", "range"]),
  /**
   * Format of Date in Button
   */
  format: PropTypes.instanceOf(MomentFormatSpecification),

  /**
   * Initial Value to load.
   * If providing via data attribute(data-initial-value) make sure
   * to also provide a data-initial-value-format
   * or else date won't be read correctly and will
   * ultimately just be ommited
   */
  initialValue: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  ]),
  /**
   * value of DatePicker
   */
  value: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  ]),
  /**
   * Setter function for value state
   */
  setValue: PropTypes.func,
  /**
   * callback to when preset is selected or Calendar is closed
   * @param {String} inputId <br/>
   * @param {Date|Date[]} value
   */
  onSave: PropTypes.func,
  /**
   * Max Date to allow for selection
   */
  maxDate: PropTypes.instanceOf(Date),
  /**
   * Max Number of days for DateRange
   */
  maxDateRange: PropTypes.number,
  /**
   * Array of Keys that correspond to a preset item
   */
  disabledPresets: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(String),
  ]),
};

export default DatePicker;
