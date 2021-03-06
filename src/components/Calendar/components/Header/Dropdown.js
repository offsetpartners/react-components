import Menu from "antd/lib/menu";
import Button from "antd/lib/button";
import { memo, useState } from "react";
import Dropdown from "antd/lib/dropdown";

const HeaderDropdown = ({ label, items, onClick, menuProps }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dropdown
      visible={open}
      trigger={["click"]}
      onVisibleChange={(v) => setOpen(v)}
      overlayClassName="fig-datepicker-preset-popover"
      overlay={() => (
        <Menu
          {...menuProps}
          onClick={(clicked) => {
            setOpen(false);

            if (typeof onClick === "function") {
              onClick(clicked);
            }
          }}
        >
          {items.map((i) => (
            <Menu.Item key={i.key} {...i.props}>
              {i.label}
            </Menu.Item>
          ))}
        </Menu>
      )}
    >
      <Button
        size="small"
        type="ghost"
        className="fig-datepicker-header-dropdown"
      >
        <span className="fig-typography fig-sm-body-semibold fig-datepicker-preset-label">
          {label}
        </span>
      </Button>
    </Dropdown>
  );
};

export default memo(HeaderDropdown);
