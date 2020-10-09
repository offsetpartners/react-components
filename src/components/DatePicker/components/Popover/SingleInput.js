import React from "react";
import moment from "moment";
import Calendar from "components/Calendar";
import { useDatePicker } from "components/DatePicker/provider";

export default () => {
  const { value, setValue } = useDatePicker();

  return (
    <Calendar
      selected={value}
      headerComponents={{ left: ["previousMonth"], right: ["nextMonth"] }}
      onCellClick={(d) => {
        const newValue = moment(d);
        setValue(newValue);
      }}
    />
  );
};
