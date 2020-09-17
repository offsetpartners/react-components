import moment from "moment";
import "./styles/index.less";
import Week from "./components/Week";
import Header from "./components/Header";
import DaysLabel from "./components/DaysLabel";
import React, { useState, useEffect, memo, useCallback } from "react";

export default memo(function Calendar({
  month,
  setMonth,
  year,
  setYear,
  render,
  onDateChange,
}) {
  const [mounted, setMounted] = useState(false);

  // Make sure that appropriate Setter Functions are provided
  // if Calendar is a Controlled Component
  if ((month && !setMonth) || (year && !setYear)) {
    throw new Error("You must provide a setter fn for a Controlled Component!");
  }

  // Default State Setter
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
              />
            </th>
          </tr>
        </thead>

        <tbody className="fig-calendar-body">
          <tr className="fig-calendar-container">
            <DaysLabel />
          </tr>

          <tr className="fig-calendar-container">
            {/* Allow for a custom Render fn */}
            {render && typeof render === "function" ? (
              render(month || _month, year || _year)
            ) : (
              <Week
                year={year || _year}
                month={month || _month}
                onClick={(date) => console.log(date)}
              />
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
});
