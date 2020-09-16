import { Col, Select } from "antd";
import React, { Fragment } from "react";
import { BOOLEAN_SELECT_CONDITION } from "components/QueryBuilder/lib/conditions";

export default ({
  value,
  setValue,
  condition,
  setCondition,
  optionValues = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ],
}) => {
  return (
    <Fragment>
      <Col xs={12} sm={4}>
        <Select
          autoFocus
          value={condition}
          onChange={setCondition}
          placeholder="Condition"
          style={{ width: "100%" }}
          options={BOOLEAN_SELECT_CONDITION.map((v) => ({
            label: v.label ? v.label : v,
            value: v.value ? v.value : v,
          }))}
        />
      </Col>

      {condition && (
        <Col xs={12} sm={8}>
          <Select
            autoFocus
            value={value}
            placeholder="Value"
            options={optionValues}
            style={{ width: "100%" }}
            onChange={(val, options) => {
              setValue(val);
            }}
          />
        </Col>
      )}
    </Fragment>
  );
};
