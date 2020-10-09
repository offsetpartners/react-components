import moment from "moment";
import Popover from "../Popover";
import React, { useState } from "react";
import { Row, Col, Menu, Button, Dropdown } from "antd";
import { useDatePicker } from "components/DatePicker/provider";
import { Calendar, ChevronUp, ChevronDown } from "react-feather";
import { getValueFromPreset } from "components/DatePicker/utils";

export default () => {
  const {
    type,
    items,
    value,
    preset,
    format,
    onSave,
    setValue,
    setPreset,
  } = useDatePicker();

  const [open, setOpen] = useState(false);

  let dateText, Icon;
  if (type === "range") {
    // Set Text
    dateText = `${moment(value[0]).format(format)}-${moment(value[1]).format(
      format
    )}`;
  } else {
    dateText = moment(value).format(format);
  }

  if (open) {
    Icon = (
      <span className="anticon anticon-down ant-select-suffix">
        <ChevronUp width={18} height={18} />
      </span>
    );
  } else {
    Icon = (
      <span className="anticon anticon-down ant-select-suffix">
        <ChevronDown width={18} height={18} />
      </span>
    );
  }
  return (
    <Row align="middle" className="fig-datepicker-container">
      <Col span={12}>
        <Dropdown
          visible={open}
          trigger={["click"]}
          onVisibleChange={(v) => setOpen(v)}
          overlay={() => (
            <Menu
              selectedKeys={[preset.key]}
              onClick={(clicked) => {
                setOpen(false);

                const newPreset = items.find((i) => i.key === clicked.key);
                getValueFromPreset(type, newPreset, setPreset, setValue);
                onSave();
              }}
            >
              {items.map((i) => (
                <Menu.Item key={i.key}>{i.label}</Menu.Item>
              ))}
            </Menu>
          )}
        >
          <Button block type="ghost" className="fig-datepicker-preset">
            <Row>
              <Col className="fig-datepicker-preset-label">{preset.label}</Col>
              <Col className="fig-datepicker-preset-icon">{Icon}</Col>
            </Row>
          </Button>
        </Dropdown>
      </Col>

      <Col span={12}>
        <Popover>
          <Button
            block
            type="ghost"
            className="fig-datepicker-calendar"
            icon={
              <span className="anticon ant-select-prefix">
                <Calendar width={18} height={18} />
              </span>
            }
          >
            <span className="fig-typography fig-body">{dateText}</span>
          </Button>
        </Popover>
      </Col>
    </Row>
  );
};
