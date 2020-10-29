import { useSelectRef } from "./hooks";
import { Col, Select, Grid } from "antd";
import { handleChange } from "./helpers";
import { useRef, useEffect, useState, Fragment } from "react";
import { MULTI_SELECT_CONDITIONS } from "components/QueryBuilder/lib/conditions";

export default ({
  value,
  disabled,
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
        <Col xs={12} sm={8} ref={selectRef}>
          <Select
            autoFocus
            value={value}
            mode="multiple"
            disabled={disabled}
            placeholder="Values"
            options={optionValues}
            showSearch={searchable}
            maxTagCount={selectMaxTagCount}
            className="fig-query-builder-select"
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
