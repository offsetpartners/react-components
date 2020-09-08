import React, { Fragment } from "react";
import { Col, Input, Select } from "antd";
import { KEYWORD_CONDITIONS } from "../../lib/conditions";

export default ({ value, setValue, condition, setCondition }) => {
  return (
    <Fragment>
      <Col xs={12} sm={4}>
        <Select
          autoFocus
          value={condition}
          placeholder="Condition"
          style={{ width: "100%" }}
          dropdownMatchSelectWidth={false}
          onSelect={(value) => setCondition(value)}
        >
          {KEYWORD_CONDITIONS.map((key, index) => {
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
            placeholder="Keyword"
            onChange={(e) => setValue(e.target.value)}
          />
        </Col>
      )}
    </Fragment>
  );
};
