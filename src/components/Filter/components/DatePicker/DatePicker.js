import Select from "antd/lib/select";
import CheckBox from "antd/lib/checkbox";
import { ChevronDown } from "react-feather";
import { memo, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "components/DatePicker";

const _DatePicker = (props) => {
  const [type, setType] = useState("single");
  const { id, title, checked, selected, onChildChange, onParentChange } = props;
  const getDatePickerProps = useMemo(() => {
    const defaultProps = {
      onChange: (val) => {
        if (typeof onChildChange === "function" && val !== selected) {
          onChildChange(id, val);
        }
      },
    };
    let _props = {};
    if (type === "single") {
      _props = {
        type: "single",
      };
    } else if (type === "range") {
      _props = {
        type: "range",
      };
    }

    return { ..._props, ...defaultProps };
  }, [type]);
  return (
    <div className="filter-box-popover-datepicker">
      <div
        className="filter-box-popover-datepicker-parent"
        onKeyDown={() => {}}
        onClick={(e) => {
          if (typeof onParentChange === "function") {
            onParentChange(id, { target: { checked: !checked } });
          }
        }}
      >
        <CheckBox
          checked={checked}
          className="filter-box-popover-datepicker-parent-checkbox"
          onChange={(e) => {
            if (typeof onParentChange === "function") {
              onParentChange(id, e);
            }
          }}
        />

        <span className="filter-box-popover-datepicker-parent-title">
          {title}
        </span>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="filter-box-popover-datepicker-children"
            transition={{ duration: 0.12 }}
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
          >
            <div className="filter-box-popover-datepicker-children-wrapper">
              <Select
                value={type}
                onChange={(v) => setType(v)}
                className="filter-box-popover-datepicker-children-type"
                options={[
                  { label: "Range", value: "range" },
                  { label: "Single", value: "single" },
                ]}
                suffixIcon={
                  <span className="anticon anticon-down ant-select-suffix">
                    <ChevronDown width={18} height={18} />
                  </span>
                }
              />
              <DatePicker {...getDatePickerProps} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(_DatePicker);
