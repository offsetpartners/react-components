import React, { Fragment } from "react";
import { Col, Select, Cascader } from "antd";
import { parseCountryRegion } from "./helpers";
import { MULTI_SELECT_CONDITIONS } from "components/QueryBuilder/lib/conditions";

export default ({
  value,
  setValue,
  condition,
  setCondition,
  inputProps = {},
}) => {
  return (
    <Fragment>
      <Col xs={12} sm={4}>
        <Select
          autoFocus
          value={condition}
          placeholder="Condition"
          style={{ width: "100%" }}
          dropdownMatchSelectWidth={false}
          onChange={(val) => setCondition(val)}
          options={MULTI_SELECT_CONDITIONS.map((v) => ({
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
            options={parseCountryRegion()}
            onChange={(val) => setValue(val)}
          />
        </Col>
      )}
    </Fragment>
  );
};
