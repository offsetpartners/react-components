import React from "react";
import Base from "./Base";
import { Plus, Trash } from "react-feather";
import { Row, Col, Space, Button, Select, Popconfirm } from "antd";

export default (props) => {
  const {
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
    <Row align="middle" gutter={[8, 8]}>
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
            setRule("type", inputs[val].type, index);
          }}
        >
          {rules}
        </Select>
      </Col>

      <Base {...props} />

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
            <Button
              onClick={onNewRule}
              disabled={!isLastRule}
              icon={
                <span className="anticon">
                  <Plus size="1em" />
                </span>
              }
            >
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
              icon={
                <span className="anticon">
                  <Trash size="1em" />
                </span>
              }
            ></Button>
          </Popconfirm>
        </Space>
      </Col>
    </Row>
  );
};
