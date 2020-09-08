import React from "react";
import Rule from "../Rule";
import { useQueryBuilder } from "../../Provider";
import { DeleteOutlined } from "@ant-design/icons";
import { Row, Col, Card, Button, Select, Divider, Popconfirm } from "antd";

const getRules = (inputs) => {
  const rn = new Date().getMilliseconds;
  if (
    inputs.opt_groups &&
    Array.isArray(inputs.opt_groups) &&
    inputs.opt_groups.length > 0
  ) {
    return inputs.opt_groups.map((opt, index) => {
      return (
        <Select.OptGroup label={opt.label} key={`${rn}-${opt.label}-${index}`}>
          {opt.options.map((option, index) => {
            const data = inputs[option];
            return (
              <Select.Option value={option} key={`${rn}-${option}-${index}`}>
                {data.label}
              </Select.Option>
            );
          })}
        </Select.OptGroup>
      );
    });
  }

  return Object.keys(inputs).map((key, index) => {
    const label = inputs[key].label;
    return (
      <Select.Option value={key} key={`${rn}-${label}-${index}`}>
        {label}
      </Select.Option>
    );
  });
};

export default (props) => {
  const cardStyle = {
    margin: "auto",
  };

  const { type, index, rules, inputs } = props;

  const ruleKeys = getRules(inputs);
  const { handleDelete, handleNewRule, handleRuleChange } = useQueryBuilder();
  return (
    <Card
      bordered
      style={cardStyle}
      actions={
        index > 0
          ? [
              <Popconfirm
                disabled={!index > 0}
                onConfirm={() => handleDelete(type, index)}
                title="Are you sure you want to delete this Segment?"
              >
                <Button block type="text" icon={<DeleteOutlined />}>
                  Delete Segment
                </Button>
              </Popconfirm>,
            ]
          : []
      }
    >
      <Row>
        {rules.map((v, i) => {
          const shouldShowDivider = rules.length > 1 && i !== rules.length - 1;
          return (
            <Col span={24} key={`segment-${index}-rule-${i}`}>
              <Rule
                {...v}
                index={i}
                inputs={inputs}
                rules={ruleKeys}
                isLastRule={i === rules.length - 1}
                type={inputs[v.rule] && inputs[v.rule].type}
                setRule={(key, value) =>
                  handleRuleChange(type, index, i, key, value)
                }
                onNewRule={() => handleNewRule(type, index)}
                onDelete={() => handleDelete(type, index, i)}
              />
              {shouldShowDivider && <Divider dashed />}
            </Col>
          );
        })}
      </Row>
    </Card>
  );
};
