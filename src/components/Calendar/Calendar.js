import propTypes from "./propTypes";
import React, { memo } from "react";
import Week from "./components/Week";
import Header from "./components/Header";
import CalendarProvider from "./provider";
import DaysLabel from "./components/DaysLabel";

const Calendar = (props) => {
  return (
    <CalendarProvider {...props}>
      <div className="fig-calendar-wrapper">
        <table className="fig-calendar-table">
          <thead className="fig-calendar-header">
            <tr className="fig-calendar-header-row">
              <th className="fig-calendar-header-cell">
                <Header />
              </th>
            </tr>
          </thead>

          <tbody className="fig-calendar-body">
            <tr className="fig-calendar-container">
              <DaysLabel />
            </tr>

            <tr className="fig-calendar-container">
              <Week />
            </tr>
          </tbody>
        </table>
      </div>
    </CalendarProvider>
  );
};

Calendar.propTypes = propTypes;
Calendar.defaultProps = {
  daysLabelType: "narrow",
  headerComponents: {
    left: ["previousYear", "previousMonth"],
    right: ["nextMonth", "nextYear"],
  },
};
Calendar.displayName = "Calendar";
export default memo(Calendar);
