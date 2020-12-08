import Base from "./Base";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Space from "antd/lib/space";
import Button from "antd/lib/button";
import Select from "antd/lib/select";
import { Plus, Trash } from "react-feather";
import Popconfirm from "antd/lib/popconfirm";

export default (props) => {
  const {
    rules,
    inputs,
    disabled,

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
          disabled={disabled}
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
              disabled={disabled || !isLastRule}
              onClick={!(disabled || !isLastRule) && onNewRule}
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
            disabled={disabled}
            onConfirm={() => onDelete(index)}
            title="Are you sure you want to delete this Rule?"
          >
            <Button
              danger
              type="text"
              shape="circle"
              disabled={disabled}
              icon={
                <span className="anticon">
                  <Trash size="1em" />
                </span>
              }
            />
          </Popconfirm>
        </Space>
      </Col>
    </Row>
  );
};
