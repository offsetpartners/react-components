import moment from "moment";
import { useRef } from "react";
import { TimePicker } from "antd";
import PropTypes from "prop-types";
import { findDOMNode } from "react-dom";

const BaseTimePicker = (props) => {
  const { type, inputId } = props;

  if (type === "range") {
    const rangePickerRef = useRef();

    const onBlur = () => {
      const rangePickerDomNode = findDOMNode(rangePickerRef.current);
      const [startInput, endInput] = rangePickerDomNode.querySelectorAll(
        ".ant-picker-input input"
      );
      const startValue = moment(startInput.value, props.format);
      let endValue = moment(endInput.value, props.format);
      if (!endValue.isValid()) {
        endValue = null;
      }

      if (startValue && startValue.isValid()) {
        let newValue = [startValue, endValue];
        if (endValue && endValue.isValid() && endValue.isBefore(startValue)) {
          newValue = [endValue, startValue];
        }

        if (props.onChange) {
          props.onChange(newValue);
        }
        if (props.onSave) {
          const toDate = newValue.map((v) => v && v.isValid() && v.toDate());

          props.onSave(inputId, toDate);
        }
      }
    };

    return (
      <TimePicker.RangePicker
        separator="-"
        onBlur={onBlur}
        ref={rangePickerRef}
        allowEmpty={(false, true)}
        {...props}
      />
    );
  }

  const singlePickerRef = useRef();
  const onBlur = () => {
    const singlePickerDomNode = findDOMNode(singlePickerRef.current);
    const [input] = singlePickerDomNode.querySelectorAll(
      ".ant-picker-input input"
    );
    const value = moment(input.value, props.format);
    if (value && value.isValid()) {
      if (props.onChange) {
        props.onChange(value);
      }
      if (props.onSave) {
        props.onSave(inputId, value.toDate());
      }
    }
  };
  return <TimePicker onBlur={onBlur} ref={singlePickerRef} {...props} />;
};

BaseTimePicker.defaultProps = {
  type: "single",
};

BaseTimePicker.propTypes = {
  ...TimePicker.propTypes,
  type: PropTypes.oneOf(["single", "range"]),
};

export default BaseTimePicker;
