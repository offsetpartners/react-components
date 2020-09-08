import React, { Fragment } from "react";
import { Col, Select, Slider } from "antd";
import { NUMBER_CONDITIONS } from "../../lib/conditions";

export default ({
  min = 0,
  max = 5000,

  value,
  setValue,
  condition,
  setCondition,
}) => {
  const defaultProps = {
    min,
    max,
    autoFocus: true,
    value: value || 0,
    onChange: (val) => setValue(val),
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
              const newVal = value && value[0] ? value[0] : 0;
              setValue(newVal);
            } else if (cond === "is between") {
              // Transitioning to between
              const newVal = value ? [value, max] : [min, max];
              setValue(newVal);
            }
            setCondition(cond);
          }}
        >
          {NUMBER_CONDITIONS.map((key, index) => {
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
          {condition !== "is between" && <Slider {...defaultProps} />}
          {condition === "is between" && <Slider range {...defaultProps} />}
        </Col>
      )}
    </Fragment>
  );
};
