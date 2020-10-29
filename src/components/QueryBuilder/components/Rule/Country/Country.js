import { Fragment } from "react";
import { Col, Select, Cascader } from "antd";
import { parseCountryRegion } from "./helpers";
import { MULTI_SELECT_CONDITIONS } from "components/QueryBuilder/lib/conditions";

export default ({
  value,
  disabled,
  setValue,
  condition,
  setCondition,
  inputProps = {},
}) => {
  const options = parseCountryRegion();
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
          onChange={(val) => setCondition(val)}
          options={Object.keys(MULTI_SELECT_CONDITIONS).map((v) => ({
            label: v.label ? v.label : v,
            value: v.value ? v.value : v,
          }))}
        />
      </Col>

      {condition && (
        <Col xs={12} sm={8}>
          <Cascader
            value={value}
            changeOnSelect
            {...inputProps}
            showSearch={10}
            options={options}
            disabled={disabled}
            onChange={(val) => setValue(val)}
          />
        </Col>
      )}
    </Fragment>
  );
};
