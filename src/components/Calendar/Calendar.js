import moment from "moment";
import PropTypes from "prop-types";
import Week from "./components/Week";
import Header from "./components/Header";
import DaysLabel from "./components/DaysLabel";
import React, { useState, useEffect, memo, useCallback } from "react";

const Calendar = ({
  // State Props
  selected,
  setSelected,
  month,
  setMonth,
  year,
  setYear,

  // Data fetching Props
  onCellClick,
  onDateChange,
  renderCellContent,

  // UI Props
  headerComponents,
}) => {
  const [mounted, setMounted] = useState(false);

  // Make sure that appropriate Setter Functions are provided
  // if Calendar is a Controlled Component
  if (
    (year && !setYear) ||
    (month && !setMonth) ||
    (selected && !setSelected)
  ) {
    throw new Error("You must provide a setter fn for a Controlled Component!");
  }

  // Default State Setter
  const [_selected, _setSelected] = useState(new Date());
  const [_month, _setMonth] = useState(moment().month());
  const [_year, _setYear] = useState(moment().year());

  const gatedSetYear = useCallback((v) => {
    if (setYear && typeof setYear === "function") return setYear(v);

    _setYear(v);
  }, []);

  const gatedSetMonth = useCallback((v) => {
    let _v = v;
    if (v < 0) {
      _v = 11;
      gatedSetYear((y) => y - 1);
    } else if (v > 11) {
      _v = 0;
      gatedSetYear((y) => y + 1);
    }

    if (setMonth && typeof setMonth === "function") return setMonth(_v);

    _setMonth(_v);
  }, []);

  const gatedSelector = useCallback((v) => {
    if (setSelected && typeof setSelected === "function") return setSelected(v);

    _setSelected(v);
  }, []);

  // Run onDateChange callback
  useEffect(() => {
    if (mounted && onDateChange && typeof onDateChange === "function")
      onDateChange(month || _month, year || _year);
  }, [month ?? _month, year ?? _year]);

  // Run on Mount
  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return (
    <div className="fig-calendar-wrapper">
      <table className="fig-calendar">
        <thead className="fig-calendar-header">
          <tr className="fig-calendar-header-row">
            <th className="fig-calendar-header-cell">
              <Header
                year={year ?? _year}
                setYear={gatedSetYear}
                month={month ?? _month}
                setMonth={gatedSetMonth}
                components={headerComponents}
              />
            </th>
          </tr>
        </thead>

        <tbody className="fig-calendar-body">
          <tr className="fig-calendar-container">
            <DaysLabel />
          </tr>

          <tr className="fig-calendar-container">
            <Week
              year={year || _year}
              month={month || _month}
              selected={selected || _selected}
              renderContent={renderCellContent}
              onClick={(d) => {
                if (typeof onCellClick === "function") {
                  onCellClick(d);
                }
                gatedSelector(() => d);
              }}
            />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

Calendar.propTypes = {
  /**
   * Selected Date
   */
  selected: PropTypes.instanceOf(Date),
  /**
   * Setter for Selected Date
   */
  setSelected: PropTypes.func,

  /**
   * If provided you must also provide setter fns and year prop
   * to allow the Component to be Controlled.
   */
  month: PropTypes.number,
  /**
   * Setter function for Month
   */
  setMonth: PropTypes.func,

  /**
   * If provided you must also provide setter fns and month prop
   * to allow the Component to be Controlled.
   */
  year: PropTypes.number,
  /**
   * Setter function for Year
   */
  setYear: PropTypes.func,

  /**
   * Callback for when a cell is clicked
   *
   * @param {Date} date
   */
  onCellClick: PropTypes.func,

  /**
   * Callback for when Date Changes
   *
   * @param {Number} month
   * @param {Number} year
   */
  onDateChange: PropTypes.func,

  /**
   * Control what is displayed on the Header
   *
   */
  headerComponents: PropTypes.shape({
    left: PropTypes.arrayOf(
      /**
       *
       * @enum {("nextYear"|"nextMonth"|"previousYear"|"previousMonth")}
       */
      PropTypes.oneOf([
        "nextYear",
        "nextMonth",
        "previousYear",
        "previousMonth",
      ])
    ),
    right: PropTypes.arrayOf(
      /**
       *
       * @enum {("nextYear"|"nextMonth"|"previousYear"|"previousMonth")}
       */
      PropTypes.oneOf([
        "nextYear",
        "nextMonth",
        "previousYear",
        "previousMonth",
      ])
    ),
  }),
};

Calendar.defaultProps = {
  headerComponents: {
    left: ["previousMonth"],
    right: ["nextMonth"],
  },
};

export default memo(Calendar);
