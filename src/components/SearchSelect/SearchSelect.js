import "./style.less";
import Grid from "antd/lib/grid";
import PropTypes from "prop-types";
import Select from "antd/lib/select";
import { useSelectRef } from "./hooks";
import { ChevronDown } from "react-feather";
import { useRef, useEffect, useState } from "react";
import { fixOptions, handleChange } from "./helpers";

const SearchSelect = ({
  value,
  inputId,
  disabled,
  setValue,
  onSearch,
  onSetValue,
  searchValue,
  options = [],
  initialValue,
  multiple = false,
  filterOption = true,
  autoClearSearchValue = true,
  className = "search-select",
  suffixIcon = <ChevronDown />,
  placeholder = "Select a value...",
}) => {
  // 1. Ensure that the Component does not have the same className
  // as the mountNode
  if (className === "fig-search-select") {
    throw new Error(
      "Cannot set the className as " +
        className +
        " as it will prevent the Component from mounting!"
    );
  }

  // 2. Setup Component
  const { useBreakpoint } = Grid;
  const fixedOptions = fixOptions(options);

  const selectRef = useRef(null);
  const breakpoint = useBreakpoint();

  let actualValue, actualSetterFn;
  const wrappedIcon = (
    <span role="img" className="anticon ant-select-suffix">
      {suffixIcon}
    </span>
  );
  const [_value, _setValue] = useState(initialValue);
  const [selectWidth, setSelectWidth] = useState(0);
  const [selectMaxTagCount, setSelectMaxTagCount] = useState(null);
  useSelectRef(breakpoint, selectRef, setSelectWidth);

  // 3. Ensure to use external State as opposed to internal State
  if (typeof value !== "undefined" && typeof setValue === "function") {
    actualValue = value;
    actualSetterFn = setValue;
  } else {
    actualValue = _value;
    actualSetterFn = _setValue;
  }

  // 4. Init hooks
  // Listen to width changes to make sure the input doesn't wrap
  useEffect(() => {
    handleChange(actualValue, selectWidth, fixedOptions, setSelectMaxTagCount);
  }, [selectWidth]);

  // 5. Render Component
  return (
    <div
      ref={selectRef}
      style={{ width: "100%" }}
      className="fig-search-select-container"
    >
      <Select
        showArrow
        allowClear
        showSearch
        value={actualValue}
        disabled={disabled}
        className={className}
        options={fixedOptions}
        suffixIcon={wrappedIcon}
        searchValue={searchValue}
        optionFilterProp="label"
        style={{ width: "100%" }}
        placeholder={placeholder}
        filterOption={filterOption}
        maxTagCount={selectMaxTagCount}
        mode={multiple ? "multiple" : null}
        autoClearSearchValue={autoClearSearchValue}
        onSearch={(v) => {
          if (typeof onSearch === "function") {
            onSearch(v);
          }
        }}
        onChange={(val) => {
          const sortedVal = handleChange(
            val,
            selectWidth,
            fixedOptions,
            setSelectMaxTagCount
          );

          actualSetterFn(sortedVal);
          if (typeof onSetValue === "function") {
            onSetValue(inputId, sortedVal);
          }
        }}
      />
    </div>
  );
};

SearchSelect.propTypes = {
  /**
   * If you want this component to correspond with a specific input.
   */
  inputId: PropTypes.string,
  /**
   * If true, will allow user to select multiple values
   */
  multiple: PropTypes.bool,
  /**
   * Makes Component read-only
   */
  disabled: PropTypes.bool,
  /**
   * Enables Options to be filtered
   */
  filterOption: PropTypes.bool,
  /**
   * Whether search should clear when selecting an item
   */
  autoClearSearchValue: PropTypes.bool,
  /**
   * Custom ClassName for Component.<br />
   * Warning: This cannot be set to `fig-search-select` as that is reserved for moundNode.
   */
  className: PropTypes.string,
  /**
   * Placeholder
   */
  placeholder: PropTypes.string,
  /**
   * Options for Select
   */
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
    ])
  ),
  /**
   * Initial Value
   */
  initialValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf([PropTypes.string, PropTypes.number]),
  ]),
  /**
   * Value for Component
   * If omitted then Component will use internal state.
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf([PropTypes.string, PropTypes.number]),
  ]),
  /**
   * Setter Function for Component.
   * If omitted then Component will use internal state.
   */
  setValue: PropTypes.func,
  /**
   * Callback function  that executes everutime value changes
   * @param {String} inputId Passes whatever inputId prop was provided<br/>
   * @param {(String|Number|Array.<(String|Number)>)} value
   */
  onSetValue: PropTypes.func,
  /**
   * SearchValue
   */
  searchValue: PropTypes.string,
  /**
   * Setter Function for searchValue
   * @param {String} value
   */
  onSearch: PropTypes.func,
};

export default SearchSelect;
