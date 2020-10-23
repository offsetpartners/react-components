import PropTypes from "prop-types";
import { MomentFormatSpecification } from "moment";

export default {
  /**
   * Type of picker
   */
  type: PropTypes.oneOf(["single", "range"]),
  /**
   * Format of Date in Button
   */
  format: PropTypes.instanceOf(MomentFormatSpecification),

  /**
   * Initial Value to load
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
