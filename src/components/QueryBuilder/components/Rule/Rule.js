import React from "react";
import Keyword from "../Keyword";
import DateRule from "../DateRule";
import NumberRule from "../NumberRule";
import MultiSelect from "../MultiSelect";
import BooleanSelect from "../BooleanSelect";
import CountryRegionSelect from "../CountryRegionSelect";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Row, Col, Space, Button, Select, Popconfirm } from "antd";

const ProperRule = ({ type, ...props }) => {
  switch (type) {
    case "date":
      return <DateRule {...props} />;
    case "number":
      return <NumberRule {...props} />;
    case "keyword":
      return <Keyword {...props} />;
    case "multi_select":
      return <MultiSelect {...props} />;
    case "boolean_select":
      return <BooleanSelect {...props} />;
    case "countr_region_select":
      return <CountryRegionSelect {...props} />;
    default:
      return null;
  }
};

export default (props) => {
  const {
    type,
    rules,
    inputs,

    rule,
    index,
    value,

    setRule,
    onDelete,
    onNewRule,
    condition,
    isLastRule,
  } = props;
  return (
    <Row align="middle" gutter={[8, 0]}>
      <Col xs={24} sm={8}>
        <Select
          showSearch
          value={rule}
          placeholder="Rule Type"
          style={{ width: "100%" }}
          onSelect={(val) => {
            setRule("rule", val, index);

            // Reset Rule Values
            setRule("value", undefined, index);
            setRule("condition", undefined, index);
          }}
        >
          {rules}
        </Select>
      </Col>

      <ProperRule
        type={type}
        value={value}
        condition={condition}
        setValue={(val) => setRule("value", val, index)}
        setCondition={(cond) => setRule("condition", cond, index)}
        searchable={inputs[rule]?.type}
        optionValues={inputs[rule]?.values?.map((v) => ({
          label: v.label ? v.label : v,
          value: v.value ? v.value : v,
        }))}
      />

      <Col
        sm={4}
        xs={24}
        style={{
          display: "flex",
          marginLeft: "auto",
          justifyContent: "flex-end",
        }}
      >
        <Space>
          {condition && value && (
            <Button icon={<PlusOutlined />} onClick={onNewRule} disabled={!isLastRule}>
              Or
            </Button>
          )}

          <Popconfirm
            onConfirm={() => onDelete(index)}
            title="Are you sure you want to delete this Rule?"
          >
            <Button
              danger
              type="text"
              shape="circle"
              icon={<DeleteOutlined />}
            ></Button>
          </Popconfirm>
        </Space>
      </Col>
    </Row>
  );
};
