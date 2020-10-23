import React from "react";
import moment from "moment";
import Calendar from "components/Calendar";
import { useDatePicker } from "components/DatePicker/provider";
import { getPresetFromValue } from "components/DatePicker/utils";

export default () => {
  const {
    type,
    items,
    value,
    setValue,
    month,
    setMonth,
    year,
    setYear,
    setPreset,
  } = useDatePicker();

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
        setPreset(getPresetFromValue(type, items, newValue) || false);
      }}
    />
  );
};
