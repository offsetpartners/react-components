import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/index.less";
import Icon from "./components/Icon";
import Popover from "antd/lib/popover";
import Text from "./components/Text";
import Select from "./components/Select";
import initHandlers from "./lib/handlers";
import DatePicker from "./components/DatePicker";

const Filter = (props) => {
  const {
    options,
    disabled,
    startIcon,
    title = { button: "Filter", dropdown: "Filters" },
  } = props;

  // 1. Apply custom styles if necessary
  const _icon = typeof startIcon !== "undefined" ? startIcon : <Icon />;
  const _title = Object.assign({}, title, {
    button: "Filter",
    dropdown: "Filters",
  });
  const [selected, setSelected] = useState({});
  const {
    select: { onParentChange, onChildChange },
  } = initHandlers({ selected, setSelected });
  console.log(selected)
  return (
    <>
      <Popover
        trigger="click"
        placement="bottomLeft"
        autoAdjustOverflow={false}
        overlayClassName="filter-box-popover-container"
        content={() => {
          return (
            <div className="filter-box-popover">
              <div className="filter-box-popover-header">
                <div className="filter-box-popover-clear">
                  <span>Clear</span>
                </div>

                <div className="filter-box-popover-title">
                  <span className="fig-lg-body">{_title.dropdown}</span>
                </div>

                <div className="filter-box-popover-save">
                  <span>Done</span>
                </div>
              </div>

              <div className="filter-box-popover-body">
                {Object.keys(options).map((option) => {
                  const { type, label, values } = options[option];
                  const _selected = selected[option];

                  switch (type) {
                    case "multi_select":
                    case "boolean_select":
                      const _type =
                        type === "multi_select" ? "multiple" : "single";
                      return (
                        <Select
                          id={option}
                          key={option}
                          type={_type}
                          title={label}
                          options={values}
                          checked={_selected}
                          selected={_selected}
                          onChildChange={(id, e) =>
                            onChildChange(id, e, { option, options: values })
                          }
                          onParentChange={(id, e) =>
                            onParentChange(id, e, { type: _type, values })
                          }
                        />
                      );
                    case "date":
                      return (
                        <DatePicker
                          id={option}
                          key={option}
                          title={label}
                          checked={_selected}
                          selected={_selected}
                          onChildChange={(id, val) => {
                            if (selected[id] !== val) {
                              setSelected((prev) => ({
                                ...prev,
                                [id]: val,
                              }));
                            }
                          }}
                          onParentChange={(id, e) => {
                            setSelected((prev) => ({
                              ...prev,
                              [id]: [],
                            }));
                          }}
                        />
                      );
                    default:
                      return (
                        <Text
                          id={option}
                          key={option}
                          title={label}
                          selected={_selected}
                          checked={typeof _selected !== "undefined"}
                          onChildChange={(id, e) => {
                            const val = e.target.value;
                            if (selected[id] !== val) {
                              setSelected((prev) => ({
                                ...prev,
                                [id]: val,
                              }));
                            }
                          }}
                          onParentChange={(id, e) => {
                            setSelected((prev) => ({
                              ...prev,
                              [id]: "",
                            }));
                          }}
                        />
                      );
                  }
                })}
              </div>
            </div>
          );
        }}
      >
        <button disabled={disabled} className="filter-box-container">
          <div className="filter-box-icon">{_icon}</div>

          <div className="filter-box-button-title">
            <span>{_title.button}</span>
          </div>

          <AnimatePresence>
            {Object.keys(selected).length > 0 && (
              <motion.div
                className="filter-box-count"
                transition={{ duration: 0.1 }}
                exit={{ opacity: 0, marginLeft: "0px" }}
                initial={{ opacity: 0, marginLeft: "0px" }}
                animate={{ marginLeft: "9px", opacity: 1 }}
              >
                <span>{Object.keys(selected).length}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </Popover>
    </>
  );
};

export default memo(Filter);
