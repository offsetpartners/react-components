import moment from "moment";
import React, { Fragment } from "react";
import { Col, Select, DatePicker } from "antd";
import { DATE_CONDITIONS } from "../../lib/conditions";

export default ({ value, setValue, condition, setCondition }) => {
  const allyProps = {
    autoFocus: true,
    allowClear: false,
    format: "MMM D, YYYY",
    style: { width: "100%" },
  };

  const defaultProps = {
    value: value,
    onChange: (date) => setValue(date),
  };

  const rangePickerProps = {
    onChange: (dates) => setValue(dates),
    value:
      value && value.constructor === Array && value.length === 2
        ? [value[0], value[1]]
        : [],
  };
  return (
    <Fragment>
      <Col xs={12} sm={4}>
        <Select
          autoFocus
          value={condition}
          placeholder="Condition"
          style={{ width: "100%" }}
          dropdownMatchSelectWidth={false}
          onSelect={(cond, option) => {
            // When transitioning from between
            if (condition === "is between") {
              const newDate = value && value[0] ? value[0] : moment();
              setValue(newDate);
            } else if (cond === "is between") {
              // Transitioning to between
              const newDate = value
                ? [value, moment(value).add(1, "d")]
                : [moment(), moment().add(1, "d")];
              setValue(newDate);
            }
            setCondition(cond);
          }}
        >
          {DATE_CONDITIONS.map((key, index) => {
            return (
              <Select.Option autoFocus key={`${key}-${index}`} value={key}>
                {key}
              </Select.Option>
            );
          })}
        </Select>
      </Col>

      {condition && (
        <Col xs={12} sm={8}>
          {condition !== "is between" && (
            <DatePicker {...allyProps} {...defaultProps} />
          )}
          {condition === "is between" && (
            <DatePicker.RangePicker {...allyProps} {...rangePickerProps} />
          )}
        </Col>
      )}
    </Fragment>
  );
};
