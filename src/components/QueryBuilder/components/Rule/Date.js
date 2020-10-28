import moment from "moment";
import React, { Fragment } from "react";
import { Col, Select } from "antd";
import DatePicker from "components/DatePicker";
import { DATE_CONDITIONS } from "components/QueryBuilder/lib/conditions";

export default ({ value, disabled, setValue, condition, setCondition }) => {
  const defaultProps = {
    value: value,
    disabled: disabled,
    setValue: (date) => setValue(date),
  };

  const rangePickerProps = {
    disabled: disabled,
    setValue: (dates) => setValue(dates),
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
          disabled={disabled}
          placeholder="Condition"
          dropdownMatchSelectWidth={false}
          className="fig-query-builder-select"
          onSelect={(cond, option) => {
            // When transitioning from between
            if (condition === "is between") {
              const newDate = value && value[0] ? value[0] : moment().toDate();
              setValue(newDate);
            } else if (cond === "is between") {
              // Transitioning to between
              const newDate = value
                ? [value, moment(value).add(1, "d").toDate()]
                : [moment().toDate(), moment().add(1, "d").toDate()];
              setValue(newDate);
            }
            setCondition(cond);
          }}
        >
          {Object.keys(DATE_CONDITIONS).map((key, index) => {
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
          {condition !== "is between" && <DatePicker {...defaultProps} />}
          {condition === "is between" && (
            <DatePicker type="range" {...rangePickerProps} />
          )}
        </Col>
      )}
    </Fragment>
  );
};
