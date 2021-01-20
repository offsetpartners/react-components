import PropTypes from "prop-types";
import Popover from "antd/lib/popover";
import { memo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "./components/Icon";
import Text from "./components/Text";
import Select from "./components/Select";
import initHandlers from "./lib/handlers";
import DatePicker from "./components/DatePicker";

const Filter = memo((props) => {
  const {
    options,
    disabled,
    startIcon,
    title = { button: "Filter", dropdown: "Filters" },
    // State
    defaultSelected,
    selected,
    setSelected,
    // Callbacks
    onDone,
    onClear,
  } = props;

  // 1. Apply custom styles if necessary
  const _icon = typeof startIcon !== "undefined" ? startIcon : <Icon />;
  const _title = Object.assign({}, title, {
    button: "Filter",
    dropdown: "Filters",
  });
  // 2. Determine whether component is controller or not
  const [_selected, _setSelected] = useState(() => {
    if (typeof defaultSelected === "object") {
      return defaultSelected;
    }
    return {};
  });
  let refSelected = _selected,
    refSetSelected = _setSelected;
  useEffect(() => {
    if (typeof selected !== "undefined") {
      if (typeof setSelected !== "function") {
        console.warn(
          "Warning: For a component to be a controlled Component you must provide props: [selected, setSelected]. Ignoring custom value. More info: https://reactjs.org/docs/forms.html#controlled-components"
        );
      } else {
        refSelected = selected;
      }
    }
    if (typeof setSelected === "function") {
      if (typeof selected === "undefined") {
        console.warn(
          "Warning: For a component to be a controlled Component you must provide props: [selected, setSelected]. Ignoring custom value. More info: https://reactjs.org/docs/forms.html#controlled-components"
        );
      } else {
        refSetSelected = setSelected;
      }
    }
  }, []);
  const { header, text, select, datepicker } = initHandlers({
    selected: refSelected,
    setSelected: refSetSelected,
  });
  const PopoverContent = () => {
    return (
      <div className="filter-box-popover">
        <div className="filter-box-popover-header">
          <div
            className="filter-box-popover-clear"
            onKeyDown={() => {}}
            onClick={() => header.onClear({ onClear })}
          >
            <span>Clear</span>
          </div>

          <div className="filter-box-popover-title">
            <span className="fig-lg-body">{_title.dropdown}</span>
          </div>

          <div
            className="filter-box-popover-save"
            onKeyDown={() => {}}
            onClick={() => header.onDone({ onDone })}
          >
            <span>Done</span>
          </div>
        </div>

        <div className="filter-box-popover-body">
          {Object.keys(options).map((option) => {
            const { type, label, values } = options[option];
            const currentValue = refSelected[option];

            switch (type) {
              case "multi_select":
              case "boolean_select":
                const _type = type === "multi_select" ? "multiple" : "single";
                return (
                  <Select
                    id={option}
                    key={option}
                    type={_type}
                    title={label}
                    options={values}
                    checked={currentValue}
                    selected={currentValue}
                    onChildChange={(id, e) =>
                      select.onChildChange(id, e, {
                        option,
                        options: values,
                      })
                    }
                    onParentChange={(id, e) =>
                      select.onParentChange(id, e, {
                        type: _type,
                        values,
                      })
                    }
                  />
                );
              case "date":
                return (
                  <DatePicker
                    id={option}
                    key={option}
                    title={label}
                    checked={currentValue}
                    selected={currentValue}
                    onChildChange={(id, val) => {
                      datepicker.onChildChange(id, val);
                    }}
                    onParentChange={(id, e, props) => {
                      datepicker.onParentChange(id, e, props);
                    }}
                  />
                );
              default:
                return (
                  <Text
                    id={option}
                    key={option}
                    title={label}
                    selected={currentValue}
                    checked={typeof currentValue !== "undefined"}
                    onChildChange={(id, e) => {
                      text.onChildChange(id, e);
                    }}
                    onParentChange={(id, e) => {
                      text.onParentChange(id, e);
                    }}
                  />
                );
            }
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <Popover
        trigger="click"
        placement="bottomLeft"
        content={PopoverContent}
        autoAdjustOverflow={false}
        overlayClassName="filter-box-popover-container"
        onVisibleChange={(visible) => !visible && header.onDone({ onDone })}
      >
        <button disabled={disabled} className="filter-box-container">
          <div className="filter-box-icon">{_icon}</div>

          <div className="filter-box-button-title">
            <span>{_title.button}</span>
          </div>

          <AnimatePresence>
            {Object.keys(refSelected).length > 0 && (
              <motion.div
                className="filter-box-count"
                transition={{ duration: 0.1 }}
                exit={{ opacity: 0, marginLeft: "0px" }}
                initial={{ opacity: 0, marginLeft: "0px" }}
                animate={{ marginLeft: "9px", opacity: 1 }}
              >
                <span>{Object.keys(refSelected).length}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </Popover>
    </>
  );
});

Filter.propTypes = {
  options: PropTypes.objectOf(
    PropTypes.shape({
      type: PropTypes.oneOf(["date", "text", "multi_select", "boolean_select"])
        .isRequired,
      label: PropTypes.string.isRequired,
      values: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
          })
        ),
      ]),
    })
  ),
  disabled: PropTypes.bool,
  startIcon: PropTypes.elementType,
  title: PropTypes.objectOf(
    PropTypes.shape({
      button: PropTypes.string,
      dropdown: PropTypes.string,
    })
  ),
  // // State
  defaultSelected: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    ])
  ),
  selected: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    ])
  ),
  setSelected: PropTypes.func,
  // // Callbacks
  onDone: PropTypes.func,
  onClear: PropTypes.func,
};

export default Filter;
