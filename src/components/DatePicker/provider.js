import moment from "moment";
import { generateItems, getPresetFromValue } from "./utils";
import { useMemo, useState, useEffect, useContext, createContext, useCallback } from "react";

const DatePickerContext = createContext({
  inputId: "",
  format: "MMM D",
  maxDateRange: 0,
  maxDate: new Date(),
  type: "single" || "range",
  items: [{ key: "", label: "", date: moment() }],

  month: 0,
  setMonth: () => {},
  year: 0,
  setYear: () => {},

  preset: [],
  setPreset: () => {},
  setValue: () => {},
  value: new Date() || [new Date()],

  onSave: () => {},
});

const DatePickerProvider = (props) => {
  // Props
  const {
    children,

    type,
    inputId,
    maxDate,
    disabled,
    format = "MMM D",
    maxDateRange = 0,
    disabledPresets = [],

    onSave,

    value,
    setValue,
    initialValue,
  } = props;

  // Internal
  const _maxDate = maxDate instanceof Date ? maxDate : null;
  const _maxDateRange = typeof maxDateRange === "number" ? maxDateRange : false;
  const today = moment();
  const items = generateItems(type, _maxDateRange, disabledPresets);
  const [_month, _setMonth] = useState(today.month());
  const [_year, _setYear] = useState(today.year());

  const [_value, _setValue] = useState(() => {
    let value, month, year;
    if (type === "range") {
      if (
        typeof initialValue !== "undefined" &&
        Array.isArray(initialValue) &&
        initialValue.length === 2
      ) {
        // Check that both values provided are Dates
        if (
          initialValue[0] instanceof Date &&
          initialValue[1] instanceof Date
        ) {
          // Check if End Date is greater than Start Date
          if (initialValue[0] > initialValue[1]) {
            value = [initialValue[1], initialValue[0]];
          } else {
            value = initialValue;
          }
        }
      } else {
        value = [today.toDate(), today.clone().add(1, "d").toDate()];
      }
      month = value[0].getMonth();
      year = value[0].getFullYear();
    } else {
      if (typeof initialValue !== "undefined" && initialValue instanceof Date) {
        value = initialValue;
      } else {
        value = today.toDate();
      }
      month = value.getMonth();
      year = value.getFullYear();
    }
    _setYear(year);
    _setMonth(month);
    return value;
  });
  let actualValue = _value;
  if (typeof value !== "undefined") {
    actualValue = value;
  }
  const [preset, setPreset] = useState(
    getPresetFromValue(type, items, value || _value) || false
  );
  // Callbacks to handle state Setters
  const handleValueChange = useCallback((v) => {
    let setterFn = _setValue;
    if (typeof setValue === "function") setterFn = setValue;

    if (type === "range" && _maxDateRange) {
      const fromDate = moment(v[0]);
      const toDate = moment(v[1]);

      const diff = toDate.diff(fromDate, "d");
      if (diff > _maxDateRange) {
        setterFn([
          toDate.toDate(),
          toDate.clone().add(_maxDateRange, "d").toDate(),
        ]);
        return;
      }
    } else if (type === "single" && _maxDate) {
      const momentNew = moment(v);
      const momentMax = moment(_maxDate);

      if (momentNew.isAfter(momentMax, "d")) {
        setterFn(momentMax.toDate());
        return;
      }
    }

    setterFn(v);
  });
  const handleSave = useCallback((val) => {
    if (typeof onSave === "function") onSave(inputId, val);
  });

  // When type changes change values
  // to fit appropriate structure
  useEffect(() => {
    let act = value || _value;
    if (type === "range" && !Array.isArray(act)) {
      act = [act, moment(act).add(1, "d").toDate()];
    } else if (type === "single" && Array.isArray(act)) {
      act = act[0];
    }

    if (items && Array.isArray(items) && items.length > 0) {
      setPreset(getPresetFromValue(type, items, act) || false);
    }
    handleValueChange(act);
  }, [type]);
  const providerValue = useMemo(
    () => ({
      type,
      items,
      format,
      inputId,
      disabled,
      maxDate: _maxDate,
      maxDateRange: _maxDateRange,

      onSave: handleSave,

      // Calendar State
      month: _month,
      setMonth: _setMonth,
      year: _year,
      setYear: _setYear,

      // Date Picker State
      preset,
      setPreset,
      value: actualValue,
      setValue: handleValueChange,
    }),
    [disabled, _month, _year, type, value, _value]
  );

  return (
    <DatePickerContext.Provider value={providerValue}>
      {children}
    </DatePickerContext.Provider>
  );
};

export const useDatePicker = () => useContext(DatePickerContext);
export default DatePickerProvider;
