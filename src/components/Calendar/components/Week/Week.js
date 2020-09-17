import React from "react";
import moment from "moment";
import Cell from "components/Calendar/components/Cell";
import { DAYS_ARRAY, WEEKS_ARRAY } from "components/Calendar/lib/constants";

export default ({ month, year, onClick }) => {
  let date = 1;

  const today = moment();
  const formattedMonth = moment(`${month + 1}/${year}`, "M/YYYY");

  const daysInMonth = formattedMonth.daysInMonth();
  const firstDay = formattedMonth.startOf("month").day();

  const prevMonth = formattedMonth.subtract(1, "month");
  const prevMonthDays = prevMonth.daysInMonth();

  return WEEKS_ARRAY.map((week) => {
    return DAYS_ARRAY.map((day) => {
      if (week === 0 && day < firstDay) {
        const prevMonthDay = prevMonthDays - (firstDay - day - 1);
        return (
          <Cell key={`${day}-${week}-${month}-${year}`}>{prevMonthDay}</Cell>
        );
      } else if (date > daysInMonth) {
        const nextMonthDay = date++ - daysInMonth;

        return (
          <Cell key={`${day}-${week}-${month}-${year}`}>{nextMonthDay}</Cell>
        );
      }

      const isToday =
        month === today.month() &&
        year === today.year() &&
        date === today.date();
      const format = "YYYY-D-M";
      const dateStr = `${year}-${date}-${month}`;
      return (
        <Cell
          active
          selected={isToday}
          key={`${day}-${week}-${month}-${year}`}
          onClick={() => {
            if (typeof onClick === "function") {
              onClick(moment(dateStr, format));
            }
          }}
        >
          {date++}
        </Cell>
      );
    });
  });
};
