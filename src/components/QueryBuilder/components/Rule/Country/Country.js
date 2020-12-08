import Col from "antd/lib/col";
import { Fragment } from "react";
import Select from "antd/lib/select";
import Cascader from "antd/lib/cascader";
import { CountryRegionData } from "./data";
import { MULTI_SELECT_CONDITIONS } from "components/QueryBuilder/lib/conditions";

export default ({
  value,
  disabled,
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
            disabled={disabled}
            options={CountryRegionData}
            onChange={(val) => setValue(val)}
            fieldNames={{
              label: "name",
              value: "shortCode",
              children: "regions",
            }}
            showSearch={{
              filter: (inputValue, path) => {
                const found = path.find((p) => {
                  return p.name.indexOf(inputValue) !== -1;
                });

                return !!found;
              },
            }}
          />
        </Col>
      )}
    </Fragment>
  );
};
