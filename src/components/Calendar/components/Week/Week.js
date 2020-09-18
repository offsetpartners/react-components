import React from "react";
import moment from "moment";
import Cell from "components/Calendar/components/Cell";
import { DAYS_ARRAY, WEEKS_ARRAY } from "components/Calendar/lib/constants";

export default ({ month, year, onClick, selected, doesCellHaveEvent }) => {
  let date = 1;

  const formattedMonth = moment(`${month + 1}/${year}`, "M/YYYY");

  const daysInMonth = formattedMonth.daysInMonth();
  const firstDay = formattedMonth.startOf("month").day();

  const prevMonth = formattedMonth.subtract(1, "month");
  const prevMonthDays = prevMonth.daysInMonth();

  return WEEKS_ARRAY.map((week) => {
    const isLastWeek = week === WEEKS_ARRAY.length - 1;
    return DAYS_ARRAY.map((day) => {
      const key = `${day}-${week}-${month}-${year}`;
      if (week === 0 && day < firstDay) {
        const prevMonthDay = prevMonthDays - (firstDay - day - 1);
        return (
          <Cell key={key} isLastWeek={isLastWeek}>
            {prevMonthDay}
          </Cell>
        );
      } else if (date > daysInMonth) {
        const nextMonthDay = date++ - daysInMonth;

        return (
          <Cell key={key} isLastWeek={isLastWeek}>
            {nextMonthDay}
          </Cell>
        );
      }

      const dateObj = new Date(year, month, date);
      const momentSelected = moment(selected);
      const momentDate = moment(`${date}-${month + 1}-${year}`, "D-M-YYYY");
      const isToday = momentDate.isSame(moment(), "d");
      return (
        <Cell
          active
          key={key}
          isToday={isToday}
          isLastWeek={isLastWeek}
          hasEvent={
            typeof doesCellHaveEvent === "function"
              ? doesCellHaveEvent(dateObj)
              : doesCellHaveEvent
          }
          selected={momentSelected.isSame(momentDate, "d")}
          onClick={() => {
            if (typeof onClick === "function") {
              onClick(dateObj);
            }
          }}
        >
          {date++}
        </Cell>
      );
    });
  });
};
