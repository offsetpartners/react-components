import React from "react";
import moment from "moment";
import Calendar from "components/Calendar";
import { useDatePicker } from "components/DatePicker/provider";

export default () => {
  const { value, setValue, month, setMonth, year, setYear } = useDatePicker();

  return (
    <Calendar
      year={year}
      month={month}
      selected={value}
      setYear={setYear}
      setMonth={setMonth}
      headerComponents={{ left: ["previousMonth"], right: ["nextMonth"] }}
      onCellClick={(d) => {
        const newValue = moment(d).toDate();
        setValue(newValue);
      }}
    />
  );
};
