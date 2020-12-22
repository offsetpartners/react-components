import DatePicker from "./DatePicker";
import renderDatePicker from "common/renderDatePicker";

try {
  renderDatePicker();
} catch (e) {}

// Also allows to be used within a React Application
DatePicker.displayName = "DatePicker";
export default DatePicker;
