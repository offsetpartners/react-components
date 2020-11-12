import "./style.less";
import moment from "moment";
import PropTypes from "prop-types";
import { useState, useCallback } from "react";
import BaseTimePicker from "./_BaseTimePicker";

const TimePicker = (props) => {
  const { type, onSave, value, onChange, initialValue } = props;

  const [_value, _onChange] = useState(() => initialValue);

  /**
   * @type {moment|moment[]}
   */
  let actualValue = _value;
  if (value) actualValue = value;

  const gatedOnChange = useCallback((value) => {
    let changeCB = _onChange;

    if (typeof onChange === "function") changeCB = onChange;
    changeCB(value);
  });

  return (
    <BaseTimePicker
      {...props}
      showNow
      use12Hours
      suffixIcon={null}
      onChange={gatedOnChange}
      className="figure-timepicker"
      onSave={typeof onSave === "function" && onSave}
      // Lazily evaluate value to ensure that
      // we're always passing a valid moment value
      // in between switching different types
      value={(() => {
        let newValue = actualValue;
        if (type === "single") {
          if (Array.isArray(actualValue) && actualValue.length === 2) {
            if (actualValue[0] instanceof moment) {
              newValue = moment(actualValue[0]);
              gatedOnChange(newValue);
            }
          }
        } else if (type === "range" && !Array.isArray(actualValue)) {
          if (actualValue instanceof moment) {
            newValue = [actualValue, null];
            gatedOnChange(newValue);
          }
        }

        return newValue;
      })()}
    />
  );
};

TimePicker.defaultProps = {
  format: "hh:mm A",
};

TimePicker.propTypes = {
  ...BaseTimePicker.propTypes,
  /**
   * Type of TimePicker
   */
  type: PropTypes.oneOf(["single", "range"]),
  /**
   * Input Id
   */
  inputId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  /**
   * Format to display time as well as
   * format to allow typed time.
   * <br>**Refer to moment's format specs**
   */
  format: PropTypes.string,
  /**
   * Initial Value of Picker
   */
  initialValue: PropTypes.oneOfType([
    PropTypes.instanceOf(moment),
    PropTypes.instanceOf([moment]),
  ]),
  /**
   * On save callback
   * @param {String|String[]} inputId<br>
   * @param {Date|Date[]} value
   */
  onSave: PropTypes.func,
};

export default TimePicker;
