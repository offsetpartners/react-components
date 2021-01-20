import { memo } from "react";
import CheckBox from "antd/lib/checkbox";
import { motion, AnimatePresence } from "framer-motion";

const Text = (props) => {
  const { id, title, checked, selected, onChildChange, onParentChange } = props;
  return (
    <div className="filter-box-popover-text">
      <div
        className="filter-box-popover-text-parent"
        onKeyDown={() => {}}
        onClick={(e) => {
          if (typeof onParentChange === "function") {
            onParentChange(id, { target: { checked: !checked } });
          }
        }}
      >
        <CheckBox
          checked={checked}
          className="filter-box-popover-text-parent-checkbox"
          onChange={(e) => {
            if (typeof onParentChange === "function") {
              onParentChange(id, e);
            }
          }}
        />

        <span className="filter-box-popover-text-parent-title">{title}</span>
      </div>

      <AnimatePresence>
        {typeof selected !== "undefined" && (
          <motion.div
            className="filter-box-popover-text-children"
            transition={{ duration: 0.12 }}
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
          >
            <div className="filter-box-popover-text-children-wrapper">
              <input
                value={selected}
                placeholder="Search..."
                className="filter-box-popover-text-children-input"
                onChange={(e) => {
                  if (typeof onChildChange === "function") {
                    onChildChange(id, e);
                  }
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(Text);
