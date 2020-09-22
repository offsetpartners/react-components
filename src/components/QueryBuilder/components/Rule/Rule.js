import React from "react";
import Base from "./Base";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Row, Col, Space, Button, Select, Popconfirm } from "antd";

export default (props) => {
  const {
    rules,

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
          {/* TODO: Implement OR Operators on the backend before releasing this
          feature */}
          {condition && value && (
            <Button
              icon={<PlusOutlined />}
              onClick={onNewRule}
              disabled={!isLastRule}
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
              icon={<DeleteOutlined />}
            ></Button>
          </Popconfirm>
        </Space>
      </Col>
    </Row>
  );
};
