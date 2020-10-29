import moment from "moment";
import { message } from "antd";
import Calendar from "components/Calendar";
import { useDatePicker } from "components/DatePicker/provider";
import { getPresetFromValue } from "components/DatePicker/utils";

export default () => {
  const {
    type,
    items,
    maxDate,
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
      maxDate={maxDate}
      setYear={setYear}
      setMonth={setMonth}
      headerComponents={{ left: ["previousMonth"], right: ["nextMonth"] }}
      onCellClick={(d) => {
        let newValue = moment(d);

        if (maxDate) {
          const max = moment(maxDate);
          if (newValue.isAfter(max, "d")) {
            message.warning(
              `You cannot exceed the max date of ${max.format("MMM D, YYYY")}!`
            );
            newValue = max;
          }
        }

        setValue(newValue.toDate());
        setPreset(getPresetFromValue(type, items, newValue) || false);
      }}
    />
  );
};
