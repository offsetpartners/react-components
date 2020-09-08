import { useSelectRef } from "./hooks";
import { Col, Select, Grid } from "antd";
import { handleChange } from "./helpers";
import { MULTI_SELECT_CONDITIONS } from "../../lib/conditions";
import React, { useRef, useEffect, useState, Fragment } from "react";

export default ({
  value,
  setValue,
  condition,
  setCondition,
  searchable,
  optionValues = [],
}) => {
  const { useBreakpoint } = Grid;

  const selectRef = useRef(null);
  const breakpoint = useBreakpoint();

  const [selectWidth, setSelectWidth] = useState(0);
  const [selectMaxTagCount, setSelectMaxTagCount] = useState(null);
  useSelectRef(breakpoint, selectRef, setSelectWidth);

  useEffect(() => {
    handleChange(value, selectWidth, optionValues, setSelectMaxTagCount);
  }, [selectWidth]);

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
        <Col xs={12} sm={8} ref={selectRef}>
          <Select
            autoFocus
            value={value}
            mode="multiple"
            placeholder="Values"
            options={optionValues}
            showSearch={searchable}
            style={{ width: "100%" }}
            maxTagCount={selectMaxTagCount}
            onChange={(val, options) => {
              const sortedVal = handleChange(
                val,
                selectWidth,
                optionValues,
                setSelectMaxTagCount
              );

              setValue(sortedVal);
            }}
          />
        </Col>
      )}
    </Fragment>
  );
};
