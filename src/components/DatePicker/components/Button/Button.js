import moment from "moment";
import Popover from "../Popover";
import { useState } from "react";
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
    disabled,
    onSave,
    setYear,
    setMonth,
    setValue,
    setPreset,
  } = useDatePicker();

  const [open, setOpen] = useState(false);

  let dateText, Icon, LeftButton;
  const hasDropdown = Array.isArray(items) && items.length > 0;
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

  if (hasDropdown) {
    LeftButton = (
      <Col span={12}>
        <Dropdown
          visible={open}
          disabled={disabled}
          trigger={["click"]}
          onVisibleChange={(v) => setOpen(v)}
          overlayClassName="fig-datepicker-preset-popover"
          overlay={() => (
            <Menu
              selectedKeys={[preset.key]}
              onClick={(clicked) => {
                setOpen(false);

                const newPreset = items.find((i) => i.key === clicked.key);
                const newValue = getValueFromPreset(type, newPreset, setPreset);

                if (Array.isArray(newValue) && newValue.length > 0) {
                  setMonth(newValue[0].getMonth());
                  setYear(newValue[0].getFullYear());
                } else {
                  setMonth(newValue.getMonth());
                  setYear(newValue.getFullYear());
                }
                setValue(newValue);
                onSave(newValue);
              }}
            >
              {items.map((i) => (
                <Menu.Item key={i.key}>{i.label}</Menu.Item>
              ))}
            </Menu>
          )}
        >
          <Button
            block
            type="ghost"
            disabled={disabled}
            className="fig-datepicker-preset"
          >
            <Row>
              <Col className="fig-datepicker-preset-label">
                {preset && preset.label ? preset.label : "Custom"}
              </Col>
              <Col className="fig-datepicker-preset-icon">{Icon}</Col>
            </Row>
          </Button>
        </Dropdown>
      </Col>
    );
  }
  return (
    <Row align="middle" className="fig-datepicker-container">
      {LeftButton}
      <Col span={hasDropdown ? 12 : 24} className="fig-datepicker-calendar-col">
        <Popover>
          <Button
            block
            type="ghost"
            disabled={disabled}
            className="fig-datepicker-calendar"
          >
            <Row align="middle" className="fig-datepicker-calendar-row">
              <Col className="fig-datepicker-calendar-icon">
                <Calendar width={18} height={18} />
              </Col>
              <Col className="fig-datepicker-calendar-label">
                <span className="fig-typography fig-body">{dateText}</span>
              </Col>
            </Row>
          </Button>
        </Popover>
      </Col>
    </Row>
  );
};
