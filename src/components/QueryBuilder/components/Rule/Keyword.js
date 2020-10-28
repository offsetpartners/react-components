import React, { Fragment } from "react";
import { Col, Input, Select } from "antd";
import { KEYWORD_CONDITIONS } from "components/QueryBuilder/lib/conditions";

export default ({ value, setValue, disabled, condition, setCondition }) => {
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
          onSelect={(value) => setCondition(value)}
        >
          {Object.keys(KEYWORD_CONDITIONS).map((key, index) => {
            return (
              <Select.Option key={`${key}-${index}`} value={key}>
                {key}
              </Select.Option>
            );
          })}
        </Select>
      </Col>

      {condition && (
        <Col xs={12} sm={8}>
          <Input
            autoFocus
            value={value}
            disabled={disabled}
            placeholder="Keyword"
            onChange={(e) => setValue(e.target.value)}
          />
        </Col>
      )}
    </Fragment>
  );
};
