import Keyword from "../Keyword";
import DateRule from "../DateRule";
import React, { memo } from "react";
import NumberRule from "../NumberRule";
import MultiSelect from "../MultiSelect";
import BooleanSelect from "../BooleanSelect";
import CountryRegionSelect from "../CountryRegionSelect";

export default memo(({ type, ...props }) => {
  const {
    inputs,

    rule,
    index,
    value,

    setRule,
    condition,
  } = props;

  const formatProps = {
    value,
    condition,
    searchable: inputs[rule]?.type,
    setValue: (val) => setRule("value", val, index),
    setCondition: (cond) => setRule("condition", cond, index),
    optionValues: inputs[rule]?.values?.map((v) => ({
      label: v.label ? v.label : v,
      value: v.value ? v.value : v,
    })),
  };
  switch (type) {
    case "date":
      return <DateRule {...formatProps} />;
    case "number":
      return <NumberRule {...formatProps} />;
    case "keyword":
      return <Keyword {...formatProps} />;
    case "multi_select":
      return <MultiSelect {...formatProps} />;
    case "boolean_select":
      return <BooleanSelect {...formatProps} />;
    case "country_region_select":
      return <CountryRegionSelect {...formatProps} />;
    default:
      return null;
  }
});
