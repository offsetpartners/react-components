import { Col, Select } from "antd";
import { Fragment } from "react";
import { BOOLEAN_SELECT_CONDITION } from "components/QueryBuilder/lib/conditions";

export default ({
  value,
  disabled,
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
          disabled={disabled}
          onChange={setCondition}
          placeholder="Condition"
          className="fig-query-builder-select"
          options={Object.keys(BOOLEAN_SELECT_CONDITION).map((v) => ({
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
            disabled={disabled}
            placeholder="Value"
            options={optionValues}
            className="fig-query-builder-select"
            onChange={(val, options) => {
              setValue(val);
            }}
          />
        </Col>
      )}
    </Fragment>
  );
};
