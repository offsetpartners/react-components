import moment from "moment";
import { memo } from "react";
import Cell from "components/Calendar/components/Cell";
import { useCalendar } from "components/Calendar/provider";
import { DAYS_ARRAY, WEEKS_ARRAY } from "components/Calendar/lib/constants";

const generateDate = (month, day, year) => {
  return moment(`${month}/${day}/${year}`, "M/D/YYYY").toDate();
};

const Week = () => {
  const { maxDate, month, year } = useCalendar();

  let date = 1;

  const formattedMonth = moment(`${month + 1}/${year}`, "M/YYYY");

  const daysInMonth = formattedMonth.daysInMonth();
  const firstDay = formattedMonth.startOf("month").day();

  const nextMonth = formattedMonth.clone().add(1, "month");
  const prevMonth = formattedMonth.clone().subtract(1, "month");
  const prevMonthDays = prevMonth.daysInMonth();

  // const shouldRenderEvent = typeof doesCellHaveEvent !== "undefined";
  return WEEKS_ARRAY.map((week) => {
    const isLastWeek = week === WEEKS_ARRAY.length - 1;
    return DAYS_ARRAY.map((day) => {
      const key = `${day}-${week}-${month}-${year}`;
      // Render Previous Month's Days
      if (week === 0 && day < firstDay) {
        // Generate Date
        const prevMonthDay = prevMonthDays - (firstDay - day - 1);
        const dateObj = generateDate(
          prevMonth.month() + 1,
          prevMonthDay,
          prevMonth.year()
        );
        return (
          <Cell key={key} date={dateObj} isLastWeek={isLastWeek}>
            {prevMonthDay}
          </Cell>
        );
      }
      // Render Next Month's Days
      else if (date > daysInMonth) {
        const nextMonthDay = date++ - daysInMonth;
        const dateObj = generateDate(
          nextMonth.month() + 1,
          nextMonthDay,
          nextMonth.year()
        );
        return (
          <Cell key={key} date={dateObj} isLastWeek={isLastWeek}>
            {nextMonthDay}
          </Cell>
        );
      }

      const dateObj = generateDate(month + 1, date, year);
      return (
        <Cell
          key={key}
          date={dateObj}
          isLastWeek={isLastWeek}
          active={dateObj <= maxDate}
        >
          {date++}
        </Cell>
      );
    });
  });
};

export default memo(Week);
