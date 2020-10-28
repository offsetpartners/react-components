import Date from "./Date";
import Number from "./Number";
import Boolean from "./Boolean";
import Country from "./Country";
import Keyword from "./Keyword";
import React, { memo } from "react";
import MultiSelect from "./MultiSelect";

export default memo(({ type, ...props }) => {
  const {
    inputs,

    rule,
    index,
    value,
    disabled,

    setRule,
    condition,
  } = props;

  const formatProps = {
    value,
    disabled,
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
      return <Date {...formatProps} />;
    case "number":
      return <Number {...formatProps} />;
    case "keyword":
      return <Keyword {...formatProps} />;
    case "multi_select":
      return <MultiSelect {...formatProps} />;
    case "boolean_select":
      return <Boolean {...formatProps} />;
    case "country_region_select":
      return <Country {...formatProps} />;
    default:
      return null;
  }
});
