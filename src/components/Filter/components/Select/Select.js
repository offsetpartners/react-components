import CheckBox from "antd/lib/checkbox";
import { motion, AnimatePresence } from "framer-motion";

const Select = (props) => {
  // type="single"|"multiple"
  const {
    id,
    type,
    title,
    options,
    checked,
    selected,
    onParentChange,
    onChildChange,
    allowSelectAll = true,
  } = props;

  return (
    <div className="filter-box-popover-select">
      <div
        className="filter-box-popover-select-parent"
        onKeyDown={() => {}}
        onClick={(e) => {
          if (typeof onParentChange === "function") {
            onParentChange(id, { target: { checked: !checked } });
          }
        }}
      >
        <CheckBox
          checked={checked}
          className="filter-box-popover-select-parent-checkbox"
          onChange={(e) => {
            if (typeof onParentChange === "function") {
              onParentChange(id, e);
            }
          }}
        />

        <span className="filter-box-popover-select-parent-title">{title}</span>
      </div>

      <AnimatePresence>
        {type === "multiple" && Array.isArray(selected) && (
          <motion.div
            className="filter-box-popover-select-children"
            transition={{ duration: 0.12 }}
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
          >
            <div className="filter-box-popover-select-children-wrapper">
              {allowSelectAll && (
                <div
                  className="filter-box-popover-select-children-select"
                  onKeyDown={() => {}}
                  onClick={(e) => {
                    if (typeof onChildChange === "function") {
                      onChildChange("SELECT_ALL", {
                        target: { checked: !selected.includes("SELECT_ALL") },
                      });
                    }
                  }}
                >
                  <CheckBox
                    checked={selected.includes("SELECT_ALL")}
                    className="filter-box-popover-select-children-select-checkbox"
                    onChange={(e) => {
                      if (typeof onChildChange === "function") {
                        onChildChange("SELECT_ALL", e);
                      }
                    }}
                  />

                  <span className="filter-box-popover-select-children-select-title">
                    [Select All]
                  </span>
                </div>
              )}
              {options.map((option, i) => {
                const _id = option.value ? option.value : option;
                const _label = option.label ? option.label : option;
                const _checked = selected.includes(_id);
                return (
                  <div
                    key={_id}
                    className="filter-box-popover-select-children-select"
                    onKeyDown={() => {}}
                    onClick={(e) => {
                      if (typeof onChildChange === "function") {
                        onChildChange(_id, { target: { checked: !_checked } });
                      }
                    }}
                  >
                    <CheckBox
                      checked={_checked}
                      className="filter-box-popover-select-children-select-checkbox"
                      onChange={(e) => {
                        if (typeof onChildChange === "function") {
                          onChildChange(_id, e);
                        }
                      }}
                    />

                    <span className="filter-box-popover-select-children-select-title">
                      {_label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Select;
